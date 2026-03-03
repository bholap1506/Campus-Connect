import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Briefcase,
  CheckCircle,
  Clock,
  MessageSquare,
  Plus,
  MoreVertical,
  ChevronRight,
  Search,
  Bell,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon,
  Github,
  Linkedin,
  Award,
  BookOpen,
  Code,
  XCircle,
  Activity,
  Filter,
  BrainCircuit,
  Terminal,
  Layers,
  Zap,
  X,
  Send,
  ArrowLeft,
  ChevronLeft,
  ExternalLink,
  FileText,
  Calendar,
  Star,
  MoreHorizontal,
  Info,
  PhoneCall,
  Video,
  Image as ImageIcon,
  Smile,
  Mic,
} from "lucide-react";

// --- Mock Data ---

const INITIAL_MESSAGES = [
  {
    id: 1,
    user: "Rahul Sharma",
    lastMsg: "Did you check the Google OA results?",
    time: "12m ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    online: true,
    unread: 2,
  },
  {
    id: 2,
    user: "Ishani Kapoor",
    lastMsg: "Thanks for the referral! Really appreciate it.",
    time: "2h ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishani",
    online: false,
    unread: 0,
  },
  {
    id: 3,
    user: "Aravind M.",
    lastMsg: "Let's practice system design today at 5.",
    time: "5h ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind",
    online: true,
    unread: 0,
  },
  {
    id: 4,
    user: "Sneha Patel",
    lastMsg: "The HR round was mostly behavioral.",
    time: "1d ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    online: false,
    unread: 0,
  },
  {
    id: 5,
    user: "Microsoft Recruiting",
    lastMsg: "Your application has been shortlisted.",
    time: "2d ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MSFT",
    online: true,
    unread: 1,
  },
];

const MOCK_STORIES = [
  {
    id: 1,
    user: "Rahul S.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  },
  {
    id: 2,
    user: "Ishani K.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishani",
  },
  {
    id: 3,
    user: "Aravind M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind",
  },
  {
    id: 4,
    user: "Sneha P.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
  },
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Google University Relations",
    role: "Company",
    avatar: "G",
    content:
      "Excited to announce our Summer 2025 Internship program is now live! Looking for students passionate about Cloud Computing and AI. Application link in bio.",
    image:
      "https://images.unsplash.com/photo-1573163281530-5be9c2047571?auto=format&fit=crop&q=80&w=800",
    likes: 1240,
    comments: 85,
    time: "2h ago",
  },
  {
    id: 2,
    author: "Rahul Sharma",
    role: "Student • 4th Year",
    avatar: "RS",
    content:
      "Just cleared the technical interview round at Atlassian! Huge thanks to the CampusConnect community for the practice mocks. If anyone needs tips on the System Design round, happy to help!",
    likes: 450,
    comments: 24,
    time: "5h ago",
  },
];

const MOCK_DRIVES = [
  {
    id: "d1",
    company: "Google",
    role: "Software Engineer",
    stipend: "₹1.5L/mo",
    cgpa: 8.5,
    status: "Active",
    isEligible: true,
  },
  {
    id: "d2",
    company: "Zomato",
    role: "Product Intern",
    stipend: "₹60k/mo",
    cgpa: 7.5,
    status: "Applied",
    currentStage: "Technical Interview",
    updatedAt: "2h ago",
  },
  {
    id: "d3",
    company: "Microsoft",
    role: "SWE Intern",
    stipend: "₹1.2L/mo",
    cgpa: 8.0,
    status: "Active",
    isEligible: true,
  },
  {
    id: "d4",
    company: "Uber",
    role: "Backend Intern",
    stipend: "₹80k/mo",
    cgpa: 9.5,
    status: "Rejected",
    currentStage: "OA Round",
    updatedAt: "1d ago",
  },
];

const MOCK_LEARNING_PATHS = [
  {
    id: "dsa",
    title: "Mastering DSA",
    duration: "12 Weeks",
    modules: 48,
    students: "12k+",
    color: "blue",
    icon: BrainCircuit,
    description: "Arrays, Trees, Graphs, and Dynamic Programming.",
  },
  {
    id: "sd",
    title: "System Design 101",
    duration: "8 Weeks",
    modules: 32,
    students: "8k+",
    color: "purple",
    icon: Layers,
    description: "Scalability, Load Balancing, and Database Sharding.",
  },
  {
    id: "fe",
    title: "Full Stack Frontend",
    duration: "10 Weeks",
    modules: 40,
    students: "15k+",
    color: "orange",
    icon: Terminal,
    description: "React, State Management, and Performance.",
  },
];

const MOCK_QUESTIONS = {
  dsa: [
    {
      id: 101,
      title: "Two Sum",
      difficulty: "Easy",
      points: 10,
      category: "Array",
      solved: true,
    },
    {
      id: 102,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      points: 30,
      category: "String/DP",
      solved: false,
    },
    {
      id: 103,
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      points: 50,
      category: "Linked List",
      solved: false,
    },
    {
      id: 104,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      points: 25,
      category: "Tree",
      solved: true,
    },
  ],
  sd: [
    {
      id: 201,
      title: "Design WhatsApp",
      difficulty: "Hard",
      points: 100,
      category: "Messaging",
      solved: false,
    },
    {
      id: 202,
      title: "Design a Rate Limiter",
      difficulty: "Medium",
      points: 60,
      category: "Infrastructure",
      solved: true,
    },
    {
      id: 203,
      title: "Design Netflix Content Delivery",
      difficulty: "Hard",
      points: 100,
      category: "CDN",
      solved: false,
    },
    {
      id: 204,
      title: "URL Shortener (TinyURL)",
      difficulty: "Easy",
      points: 40,
      category: "General",
      solved: true,
    },
  ],
  fe: [
    {
      id: 301,
      title: "Custom React Hook for Throttling",
      difficulty: "Medium",
      points: 30,
      category: "Hooks",
      solved: true,
    },
    {
      id: 302,
      title: "Implement Infinite Scroll",
      difficulty: "Medium",
      points: 35,
      category: "Performance",
      solved: false,
    },
  ],
};

const USER_CGPA = 9.12;

// --- Sub-Components ---

const ChatPanel = ({ isOpen, onClose }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredMessages = INITIAL_MESSAGES.filter((m) =>
    m.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex animate-in slide-in-from-right duration-300">
        {/* Left Sidebar: Inbox List */}
        <div
          className={`flex-col border-r w-full md:w-80 lg:w-96 flex ${
            selectedChat ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-5 border-b space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black flex items-center gap-2">
                Messages
                <ChevronRight size={16} className="text-gray-400" />
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Inbox Search */}
            <div className="relative group">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"
              />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-gray-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filteredMessages.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-all border-l-4 ${
                  selectedChat?.id === chat.id
                    ? "bg-indigo-50/50 border-indigo-600"
                    : "hover:bg-gray-50 border-transparent"
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    className="w-14 h-14 rounded-full border border-gray-100 object-cover"
                    alt={chat.user}
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4
                      className={`text-sm font-bold truncate ${
                        chat.unread > 0 ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {chat.user}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p
                      className={`text-xs truncate ${
                        chat.unread > 0
                          ? "text-indigo-600 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {chat.lastMsg}
                    </p>
                    {chat.unread > 0 && (
                      <div className="bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Chat Content */}
        <div
          className={`flex-1 flex-col flex bg-white ${
            !selectedChat ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl md:hidden"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="relative">
                    <img
                      src={selectedChat.avatar}
                      className="w-10 h-10 rounded-full border"
                      alt=""
                    />
                    {selectedChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">
                      {selectedChat.user}
                    </h3>
                    <p className="text-[10px] text-green-600 font-bold">
                      {selectedChat.online ? "Online" : "Away"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500">
                    <PhoneCall size={20} />
                  </button>
                  <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500">
                    <Video size={20} />
                  </button>
                  <button
                    className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500"
                    onClick={onClose}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                <div className="flex flex-col items-center mb-8">
                  <img
                    src={selectedChat.avatar}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3"
                    alt=""
                  />
                  <h4 className="font-black text-lg">{selectedChat.user}</h4>
                  <p className="text-xs text-gray-400 font-medium">
                    IIT Delhi • Final Year
                  </p>
                  <button className="mt-4 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold transition-colors">
                    View Profile
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Mock Bubble - Received */}
                  <div className="flex gap-2 max-w-[85%]">
                    <img
                      src={selectedChat.avatar}
                      className="w-7 h-7 rounded-full self-end mb-1"
                      alt=""
                    />
                    <div className="bg-white border border-gray-100 p-3.5 rounded-2xl rounded-bl-none shadow-sm text-sm text-gray-800 leading-relaxed">
                      Hey Jatin! Are you applying for the Microsoft role? The OA
                      link just got sent out.
                    </div>
                  </div>
                  <span className="block text-[10px] text-gray-400 font-bold ml-9">
                    10:45 AM
                  </span>

                  {/* Mock Bubble - Sent */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="bg-indigo-600 text-white p-3.5 rounded-2xl rounded-br-none shadow-lg shadow-indigo-100 text-sm max-w-[85%] leading-relaxed">
                      Yeah, just finishing my resume. Did you already attempt
                      it?
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold mr-2">
                      10:48 AM • Read
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all border border-transparent focus-within:border-indigo-100">
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Smile size={22} />
                  </button>
                  <input
                    type="text"
                    placeholder="Message..."
                    className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-2"
                  />
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <Mic size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <ImageIcon size={20} />
                    </button>
                    <button className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-90">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/20">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 text-indigo-600 border border-indigo-50">
                <MessageSquare size={40} className="fill-indigo-50" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Your Inbox</h3>
              <p className="text-gray-500 mt-2 max-w-xs text-sm font-medium">
                Send private photos and messages to a friend or group.
              </p>
              <button
                className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                onClick={onClose}
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreatePostModal = ({ isOpen, onClose, onPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Jatin Das",
      role: "Student • Final Year",
      avatar: "JD",
      content: content,
      image: image || null,
      likes: 0,
      comments: 0,
      time: "Just now",
    };

    onPost(newPost);
    setContent("");
    setImage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-black text-gray-900">Create Post</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg">
              JD
            </div>
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening in your placement journey?"
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[120px] text-lg font-medium placeholder:text-gray-300"
            />
          </div>

          <div className="space-y-3">
            <div className="relative group">
              <ImageIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Paste an image URL (optional)"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t">
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                <Camera size={20} />
              </button>
              <button
                type="button"
                className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                <LinkIcon size={20} />
              </button>
            </div>
            <button
              type="submit"
              disabled={!content.trim()}
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:shadow-none"
            >
              Post Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StoryBar = () => (
  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
    <div className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-indigo-400 bg-white transition-all">
        <Plus size={24} />
      </div>
      <span className="text-[10px] font-medium text-gray-500">Your Story</span>
    </div>
    {MOCK_STORIES.map((story) => (
      <div
        key={story.id}
        className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer group"
      >
        <div className="w-16 h-16 rounded-full p-0.5 border-2 border-indigo-500 group-hover:scale-105 transition-transform bg-white shadow-sm">
          <img
            src={story.avatar}
            className="w-full h-full rounded-full border border-white"
            alt=""
          />
        </div>
        <span className="text-[10px] font-medium text-gray-700 truncate w-16 text-center">
          {story.user}
        </span>
      </div>
    ))}
  </div>
);

const PostCard = ({ post }) => (
  <div className="bg-white border border-gray-100 rounded-[2rem] mb-6 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-700 text-sm border border-indigo-100 shadow-sm">
          {post.avatar}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">{post.author}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {post.role}
          </p>
        </div>
      </div>
      <MoreHorizontal
        size={18}
        className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
      />
    </div>
    <div className="px-5 pb-4">
      <p className="text-sm text-gray-800 leading-relaxed font-medium">
        {post.content}
      </p>
    </div>
    {post.image && (
      <div className="w-full aspect-[16/10] bg-gray-50 overflow-hidden">
        <img
          src={post.image}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          alt=""
        />
      </div>
    )}
    <div className="p-4 px-5 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
      <div className="flex gap-6">
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-all hover:scale-110 active:scale-90">
          <Heart size={20} />
          <span className="text-xs font-black">{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 transition-all hover:scale-110 active:scale-90">
          <MessageCircle size={20} />
          <span className="text-xs font-black">{post.comments}</span>
        </button>
      </div>
      <div className="flex gap-4">
        <Share2
          size={20}
          className="text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
        />
        <Bookmark
          size={20}
          className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer"
        />
      </div>
    </div>
  </div>
);

const HomeView = ({ posts }) => (
  <div className="max-w-xl mx-auto py-4">
    <StoryBar />
    <div className="mt-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);

const PlacementsView = () => {
  const [filter, setFilter] = useState("All");
  const stats = [
    {
      label: "All",
      count: MOCK_DRIVES.length,
      icon: Briefcase,
      color: "indigo",
    },
    {
      label: "Eligible",
      count: MOCK_DRIVES.filter((d) => d.cgpa <= USER_CGPA).length,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Applied",
      count: MOCK_DRIVES.filter((d) => d.status === "Applied").length,
      icon: Activity,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-8 py-4 animate-in fade-in">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            onClick={() => setFilter(s.label)}
            className={`p-4 rounded-3xl border cursor-pointer transition-all ${
              filter === s.label
                ? "border-indigo-500 bg-white shadow-xl shadow-indigo-100 scale-[1.02]"
                : "bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                filter === s.label
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <s.icon size={18} />
            </div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {s.label}
            </p>
            <p className="text-xl font-black">{s.count}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-black text-gray-900">
          Active Campus Drives
        </h2>
        {MOCK_DRIVES.filter(
          (d) =>
            filter === "All" ||
            (filter === "Eligible" && d.cgpa <= USER_CGPA) ||
            (filter === "Applied" && d.status === "Applied")
        ).map((drive) => (
          <div
            key={drive.id}
            className="bg-white border p-6 rounded-[2rem] flex justify-between items-center shadow-sm group hover:border-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-50"
          >
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-2xl text-gray-700">
                {drive.company[0]}
              </div>
              <div>
                <h4 className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {drive.role}
                </h4>
                <p className="text-xs text-gray-500 font-bold">
                  {drive.company} • {drive.stipend} • CGPA {drive.cgpa}+
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${
                  drive.status === "Applied"
                    ? "bg-orange-50 text-orange-600 border-orange-100"
                    : "bg-indigo-50 text-indigo-600 border-indigo-100"
                }`}
              >
                {drive.status === "Applied" ? drive.currentStage : drive.status}
              </span>
              {drive.status === "Active" && (
                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5">
                  Apply Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PracticeView = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  if (selectedPath) {
    const questions = MOCK_QUESTIONS[selectedPath.id] || [];
    return (
      <div className="py-6 animate-in slide-in-from-right duration-500">
        <button
          onClick={() => setSelectedPath(null)}
          className="flex items-center gap-2 text-indigo-600 font-black text-sm mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft size={18} /> Back to Learning Paths
        </button>
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 mb-8 shadow-sm flex items-center gap-6">
          <div
            className={`w-20 h-20 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner`}
          >
            <selectedPath.icon size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {selectedPath.title}
            </h2>
            <p className="text-gray-500 font-medium">
              {selectedPath.description}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-black text-gray-900 px-2 mb-4">
            Recommended Challenges
          </h3>
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-gray-100 rounded-[2rem] p-5 flex items-center justify-between hover:shadow-xl hover:border-indigo-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ${
                    q.solved
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-gray-50 text-gray-300 border border-gray-100"
                  }`}
                >
                  {q.solved ? (
                    <CheckCircle size={22} />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {q.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${
                        q.difficulty === "Easy"
                          ? "bg-green-50 text-green-600"
                          : q.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
                      {q.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs font-black text-gray-400 tracking-widest">
                  {q.points} XP
                </span>
                <button
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    q.solved
                      ? "bg-gray-50 text-gray-500 border border-gray-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 hover:-translate-y-0.5"
                  }`}
                >
                  {q.solved ? "Review" : "Solve"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-10 py-6 animate-in fade-in">
      <section>
        <div className="mb-8">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Skill Hub
          </h2>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">
            Master your craft for the next career move
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_LEARNING_PATHS.map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPath(path)}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:scale-[1.02] transition-all cursor-pointer group flex flex-col h-full"
            >
              <div
                className={`w-16 h-16 rounded-3xl bg-gray-50 text-gray-700 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 transition-all duration-300 shadow-sm`}
              >
                <path.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                {path.title}
              </h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
                {path.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-white bg-gray-200"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${path.id}${i}`}
                        alt=""
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {path.students} learners
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all`}
                >
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 group cursor-pointer">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-3">Google OA 2025 prep</h3>
          <p className="text-indigo-100 text-sm mb-8 max-w-sm font-medium leading-relaxed">
            Prepare for the upcoming drive with real questions asked in previous
            years. Exclusive to IIT Delhi students.
          </p>
          <button className="bg-white text-indigo-700 px-10 py-3.5 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
            Unlock Mock Tests
          </button>
        </div>
        <Zap className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-64 h-64 text-white/5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700" />
      </div>
    </div>
  );
};

const ProfileView = () => (
  <div className="max-w-6xl mx-auto py-8 animate-in fade-in space-y-8">
    <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm relative">
      <div className="h-56 bg-gradient-to-br from-indigo-700 via-indigo-500 to-purple-600"></div>
      <div className="px-12 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-24 gap-8">
          <div className="relative group">
            <div className="w-44 h-44 rounded-[3rem] bg-indigo-50 border-[8px] border-white flex items-center justify-center text-6xl font-black text-indigo-700 shadow-2xl transition-transform group-hover:scale-[1.03]">
              JD
            </div>
            <button className="absolute bottom-3 right-3 p-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 hover:text-indigo-600 transition-colors">
              <Camera size={20} />
            </button>
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">
              Jatin Das
            </h1>
            <p className="text-indigo-600 font-black flex items-center gap-2 mt-2 uppercase text-xs tracking-widest">
              <Star size={18} className="fill-indigo-600" /> Final Year CSE
              Student @ IIT Delhi
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-xs font-black text-gray-500 border border-gray-100">
                <MapPin size={16} /> New Delhi
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-xs font-black text-gray-500 border border-gray-100">
                <Mail size={16} /> jatin.das@iitd.ac.in
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl text-xs font-black text-indigo-600 border border-indigo-100">
                <Award size={16} /> CGPA: {USER_CGPA}
              </div>
            </div>
          </div>
          <div className="flex gap-4 pb-4">
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-[1.5rem] font-black text-sm shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:translate-y-0">
              Edit Portfolio
            </button>
            <button className="p-4 bg-gray-50 rounded-[1.5rem] hover:bg-gray-100 text-gray-600 transition-colors border border-gray-100">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-gray-900">
            <User size={24} className="text-indigo-600" /> Professional Summary
          </h3>
          <p className="text-gray-600 leading-relaxed font-medium text-lg">
            Aspiring Software Engineer with a focus on high-scale distributed
            systems and frontend performance. Active contributor to campus
            open-source initiatives and 3x Hackathon winner. Currently seeking
            Full-time opportunities for August 2025.
          </p>
        </section>
        <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
            <Briefcase size={24} className="text-indigo-600" /> Experience
            Timeline
          </h3>
          <div className="space-y-10">
            <div className="relative pl-10 border-l-2 border-dashed border-gray-200">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-indigo-600 border-[5px] border-white shadow-lg"></div>
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-xl text-gray-900">
                    Software Intern @ Atlassian
                  </h4>
                  <span className="text-[10px] font-black px-3 py-1.5 bg-green-50 text-green-600 rounded-xl border border-green-100 uppercase tracking-widest">
                    Active
                  </span>
                </div>
                <p className="text-xs font-black text-gray-400 mt-1 uppercase tracking-[0.2em]">
                  Summer 2024 • Bengaluru (Remote)
                </p>
                <ul className="mt-4 text-sm text-gray-600 space-y-3 font-medium">
                  <li className="flex gap-2 items-start">
                    <CheckCircle
                      size={16}
                      className="text-indigo-500 mt-0.5 flex-shrink-0"
                    />{" "}
                    Optimizing React dashboard performance by 30% using
                    virtualization.
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle
                      size={16}
                      className="text-indigo-500 mt-0.5 flex-shrink-0"
                    />{" "}
                    Migrating legacy microservices to Go-based containers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="space-y-8">
        <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-black mb-8 text-gray-900">
            Tech Arsenal
          </h3>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase mb-5 tracking-[0.2em]">
                Primary Skills
              </p>
              <div className="flex flex-wrap gap-3">
                {["React", "TypeScript", "Node.js", "Go", "Python"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-5 py-3 bg-indigo-50 text-indigo-700 rounded-2xl text-xs font-black border border-indigo-100 shadow-sm hover:scale-110 transition-transform cursor-default"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase mb-5 tracking-[0.2em]">
                Competitions
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[1.5rem] border border-gray-100 hover:bg-white hover:shadow-lg transition-all cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                    #1
                  </div>
                  <div>
                    <p className="text-sm font-black">SIH 2023 Winner</p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Smart India Hackathon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

const Header = ({ activeTab, setActiveTab }) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setActiveTab("Home")}
      >
        <div className="bg-indigo-600 p-2.5 rounded-2xl text-white group-hover:rotate-12 transition-all shadow-xl shadow-indigo-100">
          <Briefcase size={22} strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-black tracking-tighter text-gray-900 hidden sm:block">
          CampusConnect
        </span>
      </div>

      <nav className="flex items-center bg-gray-50 border border-gray-200/50 rounded-[1.5rem] p-1.5 transition-all shadow-inner">
        <div
          className={`relative flex items-center transition-all duration-500 ease-out overflow-hidden ${
            isSearching ? "w-48 sm:w-80" : "w-10 sm:w-10"
          }`}
        >
          <Search
            size={18}
            className={`absolute left-3.5 transition-colors z-20 ${
              isSearching ? "text-indigo-600" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search drives, peers, topics..."
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
            className={`w-full py-2.5 pl-11 pr-4 text-[13px] font-bold bg-transparent rounded-2xl outline-none transition-all ${
              isSearching
                ? "placeholder-gray-400 opacity-100"
                : "placeholder-transparent opacity-0"
            }`}
          />
          {!isSearching && (
            <button
              onClick={() => setIsSearching(true)}
              className="absolute inset-0 z-10 w-full h-full rounded-2xl hover:bg-gray-200/50 transition-colors"
              aria-label="Search"
            />
          )}
        </div>

        <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>

        <div className="flex gap-1">
          {["Home", "Placements", "Practice"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 sm:px-8 py-2.5 text-[13px] font-black rounded-2xl transition-all ${
                activeTab === tab
                  ? "bg-white text-indigo-600 shadow-lg shadow-indigo-50 ring-1 ring-black/5"
                  : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex items-center gap-4">
        <button className="relative p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-all border border-transparent hover:border-gray-100 hidden sm:flex active:scale-90">
          <Bell size={22} />
          <span className="absolute top-3 right-3 bg-red-500 w-2.5 h-2.5 rounded-full border-[3px] border-white shadow-sm"></span>
        </button>

        <button
          onClick={() => setActiveTab("Profile")}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[1.2rem] flex items-center justify-center text-sm font-black border-2 transition-all ${
            activeTab === "Profile"
              ? "bg-indigo-600 text-white border-indigo-700 shadow-2xl shadow-indigo-100 scale-105"
              : "bg-white text-indigo-700 border-gray-100 hover:border-indigo-200 hover:shadow-xl"
          }`}
        >
          JD
        </button>
      </div>
    </header>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
    setActiveTab("Home");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex justify-center">
        <main className="w-full max-w-7xl px-4 md:px-8 py-8">
          {activeTab === "Home" && <HomeView posts={posts} />}
          {activeTab === "Placements" && <PlacementsView />}
          {activeTab === "Practice" && <PracticeView />}
          {activeTab === "Profile" && <ProfileView />}
        </main>
      </div>

      {/* Floating Action Area */}
      <div className="fixed bottom-10 right-10 flex flex-col items-end gap-5 z-[60]">
        {/* New Post Button */}
        <button
          onClick={() => setIsPostModalOpen(true)}
          title="Create New Post"
          className="w-16 h-16 bg-white border border-gray-100 text-indigo-600 rounded-[1.8rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-indigo-100 group border-b-4 hover:border-b-indigo-200"
        >
          <Plus
            size={32}
            className="group-active:rotate-90 transition-transform"
          />
        </button>

        {/* Messaging Icon */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-16 h-16 bg-indigo-600 text-white rounded-[1.8rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-indigo-300 group relative"
        >
          <MessageSquare
            size={28}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 w-7 h-7 rounded-[1rem] border-4 border-white flex items-center justify-center text-[10px] font-black shadow-lg">
            3
          </span>
        </button>
      </div>

      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPost={handleCreatePost}
      />
    </div>
  );
}
