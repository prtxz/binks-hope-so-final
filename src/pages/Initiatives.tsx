
import React, { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Search, ChevronDown, Plus, Recycle, Broom, Zap, Trash2, Award, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

// Mock data for initiatives
const mockInitiatives = [
  {
    id: 1,
    title: "Community Recycling Drive",
    category: "Recycling",
    description: "Collect and sort recyclables in your neighborhood to reduce landfill waste.",
    reward: 50,
    status: "Active",
    progress: 60,
  },
  {
    id: 2,
    title: "Beach Cleanup Project",
    category: "Clean-Up",
    description: "Join our team cleaning plastic waste from local beaches and waterways.",
    reward: 75,
    status: "Active",
    progress: 30,
  },
  {
    id: 3,
    title: "E-Waste Collection Drive",
    category: "E-Waste",
    description: "Responsibly dispose of electronic waste and educate communities.",
    reward: 60,
    status: "Upcoming",
    progress: 0,
  },
  {
    id: 4,
    title: "Community Garden Composting",
    category: "Composting",
    description: "Help establish and maintain composting facilities at community gardens.",
    reward: 40,
    status: "Active",
    progress: 45,
  },
  {
    id: 5,
    title: "Urban Park Restoration",
    category: "Clean-Up",
    description: "Restore and clean up urban parks to create better green spaces.",
    reward: 55,
    status: "Completed",
    progress: 100,
  },
  {
    id: 6,
    title: "School Recycling Program",
    category: "Recycling",
    description: "Implement recycling education and infrastructure in local schools.",
    reward: 65,
    status: "Active",
    progress: 75,
  },
  {
    id: 7,
    title: "Sustainable Electronics Drive",
    category: "E-Waste",
    description: "Collect and refurbish electronics for donation to underserved communities.",
    reward: 80,
    status: "Upcoming",
    progress: 0,
  },
  {
    id: 8,
    title: "Neighborhood Compost Network",
    category: "Composting",
    description: "Create a network of neighborhood composting sites to reduce food waste.",
    reward: 45,
    status: "Active",
    progress: 20,
  },
  {
    id: 9,
    title: "River Cleanup Expedition",
    category: "Clean-Up",
    description: "Join a team cleaning up pollution from local rivers and waterways.",
    reward: 70,
    status: "Completed",
    progress: 100,
  },
];

// Initiative creation form schema
const createInitiativeSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string(),
  reward: z.number().min(1, { message: "Reward must be at least 1 BINK token" }),
  startDate: z.string(),
  endDate: z.string(),
});

type CategoryIconProps = {
  category: string;
  className?: string;
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className }) => {
  switch (category) {
    case "Recycling":
      return <Recycle className={className} />;
    case "Clean-Up":
      return <Broom className={className} />;
    case "E-Waste":
      return <Zap className={className} />;
    case "Composting":
      return <Trash2 className={className} />;
    default:
      return <Recycle className={className} />;
  }
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getVariant = () => {
    switch (status) {
      case "Active":
        return "default";
      case "Completed":
        return "secondary";
      case "Upcoming":
        return "outline";
      default:
        return "default";
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
};

const InitiativeCard: React.FC<{
  initiative: typeof mockInitiatives[0];
  onViewDetails: (id: number) => void;
}> = ({ initiative, onViewDetails }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)] bg-[#2f2f2f] border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CategoryIcon category={initiative.category} className="h-5 w-5 text-[#4CAF50]" />
            <CardTitle className="text-white text-lg">{initiative.title}</CardTitle>
          </div>
          <StatusBadge status={initiative.status} />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 h-10 line-clamp-2 mb-3">
          {initiative.description}
        </CardDescription>
        <div className="text-sm font-medium text-white mb-2">
          Earn up to {initiative.reward} BINK tokens
        </div>
        {initiative.status !== "Upcoming" && (
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-[#4CAF50] rounded-full"
              style={{ width: `${initiative.progress}%` }}
            ></div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full rounded-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white transition-all"
          onClick={() => onViewDetails(initiative.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const InitiativeDetailsModal: React.FC<{
  initiative: typeof mockInitiatives[0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ initiative, open, onOpenChange }) => {
  if (!initiative) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2f2f2f] text-white border-gray-700 max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CategoryIcon category={initiative.category} className="h-5 w-5 text-[#4CAF50]" />
            <DialogTitle className="text-xl">{initiative.title}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300 pt-2">
            {initiative.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-white mb-2">Steps to Participate:</h4>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Register for the initiative in your BINK mobile app.</li>
              <li>Follow the guidelines provided in the app.</li>
              <li>Submit evidence of your participation.</li>
              <li>Earn BINK tokens upon verification.</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-2">Rewards:</h4>
            <p className="text-gray-300">
              Earn up to {initiative.reward} BINK tokens based on your participation level and impact.
            </p>
          </div>
          
          {initiative.status !== "Upcoming" && (
            <div>
              <h4 className="font-medium text-white mb-2">Current Progress:</h4>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4CAF50] rounded-full"
                  style={{ width: `${initiative.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-300 mt-1">{initiative.progress}% Complete</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            className="w-full rounded-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white transition-all"
          >
            Join Initiative
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateInitiativeModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const form = useForm<z.infer<typeof createInitiativeSchema>>({
    defaultValues: {
      title: "",
      description: "",
      category: "Recycling",
      reward: 50,
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createInitiativeSchema>) => {
    console.log(values);
    toast({
      title: "Initiative Created",
      description: "Your initiative has been submitted for approval.",
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2f2f2f] text-white border-gray-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Initiative</DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            Submit a new eco-initiative for the community.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter initiative title" 
                      {...field} 
                      className="bg-[#3d3d3d] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea 
                      placeholder="Enter detailed description" 
                      {...field} 
                      className="w-full rounded-md border border-gray-700 bg-[#3d3d3d] px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#3d3d3d] border-gray-700 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#3d3d3d] border-gray-700 text-white">
                        <SelectItem value="Recycling">Recycling</SelectItem>
                        <SelectItem value="Clean-Up">Clean-Up</SelectItem>
                        <SelectItem value="Composting">Composting</SelectItem>
                        <SelectItem value="E-Waste">E-Waste</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward (BINK tokens)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(+e.target.value)}
                        className="bg-[#3d3d3d] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-[#3d3d3d] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-[#3d3d3d] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full rounded-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white transition-all"
              >
                Create Initiative
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const Initiatives: React.FC = () => {
  const { isConnected } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most Rewarding");
  
  const [selectedInitiative, setSelectedInitiative] = useState<typeof mockInitiatives[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  
  // Handle view details
  const handleViewDetails = (id: number) => {
    const initiative = mockInitiatives.find(item => item.id === id);
    if (initiative) {
      setSelectedInitiative(initiative);
      setDetailsOpen(true);
    }
  };
  
  // Filter and sort initiatives
  const filteredInitiatives = mockInitiatives
    .filter(item => {
      // Filter by search query
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false;
      }
      
      // Filter by category
      if (categoryFilter !== "All" && item.category !== categoryFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by different criteria
      switch (sortBy) {
        case "Most Rewarding":
          return b.reward - a.reward;
        case "Newest":
          return b.id - a.id; // Using ID as a proxy for creation date in this example
        case "Ending Soon":
          return a.progress - b.progress; // Using progress as a proxy for end date
        default:
          return 0;
      }
    });
  
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Current Eco Initiatives</h1>
          <p className="text-gray-400">
            Participate in ongoing sustainability missions and earn BINK tokens.
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search initiatives..."
              className="pl-10 bg-[#2f2f2f] border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#2f2f2f] border-gray-700 text-white">
                  Status: {statusFilter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2f2f2f] border-gray-700 text-white">
                {["All", "Active", "Completed", "Upcoming"].map((status) => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#2f2f2f] border-gray-700 text-white">
                  Category: {categoryFilter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2f2f2f] border-gray-700 text-white">
                {["All", "Recycling", "Clean-Up", "Composting", "E-Waste"].map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#2f2f2f] border-gray-700 text-white">
                  Sort by: {sortBy}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2f2f2f] border-gray-700 text-white">
                {["Most Rewarding", "Newest", "Ending Soon"].map((option) => (
                  <DropdownMenuItem 
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      {option === "Most Rewarding" && <Award className="mr-2 h-4 w-4" />}
                      {option === "Newest" && <Calendar className="mr-2 h-4 w-4" />}
                      {option === "Ending Soon" && <Clock className="mr-2 h-4 w-4" />}
                      {option}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {isConnected && (
              <Button 
                className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white rounded-full ml-auto"
                onClick={() => setCreateOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Initiative
              </Button>
            )}
          </div>
        </div>
        
        {/* Initiative Cards Grid */}
        {filteredInitiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInitiatives.map((initiative) => (
              <InitiativeCard
                key={initiative.id}
                initiative={initiative}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No initiatives found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <InitiativeDetailsModal 
        initiative={selectedInitiative} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
      
      <CreateInitiativeModal 
        open={createOpen} 
        onOpenChange={setCreateOpen} 
      />
    </div>
  );
};

export default Initiatives;
