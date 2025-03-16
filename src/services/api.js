// This file simulates API calls with dummy data

// Simulated delay to mimic API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy data
const dummyPosts = [
  {
    id: 1,
    author: {
      id: 101,
      name: 'Jane Smith',
      avatar: '/avatars/user1.jpg'
    },
    community: {
      id: 1,
      name: 'Nood Creators'
    },
    content: 'Just launched my new project using Nood! Check out the link in comments.',
    images: ['/posts/project1.jpg'],
    createdAt: '2023-03-10T14:30:00Z',
    likes: 42,
    comments: 7,
    isPinned: true
  },
  {
    id: 2,
    author: {
      id: 102,
      name: 'Mike Johnson',
      avatar: '/avatars/user2.jpg'
    },
    community: {
      id: 2,
      name: 'Nood Beginners'
    },
    content: 'Looking for feedback on my first Nood project. Any suggestions for improvement?',
    images: [],
    createdAt: '2023-03-09T10:15:00Z',
    likes: 18,
    comments: 15,
    isPinned: false
  },
  {
    id: 3,
    author: {
      id: 103,
      name: 'Sarah Wilson',
      avatar: '/avatars/user3.jpg'
    },
    community: {
      id: 1,
      name: 'Nood Creators'
    },
    content: 'Here\'s a tip for all Nood beginners: Start with small projects and gradually build your skills. Don\'t try to create complex systems right away!',
    images: [],
    createdAt: '2023-03-08T16:45:00Z',
    likes: 56,
    comments: 3,
    isPinned: false
  },
  {
    id: 4,
    author: {
      id: 104,
      name: 'David Chen',
      avatar: '/avatars/user4.jpg'
    },
    community: {
      id: 3,
      name: 'Nood Professionals'
    },
    content: 'Excited to announce that I\'m hosting a workshop on advanced Nood techniques next week. Sign up link in bio!',
    images: ['/posts/workshop.jpg'],
    createdAt: '2023-03-07T09:20:00Z',
    likes: 89,
    comments: 24,
    isPinned: false
  }
];

const dummyCommunities = [
  {
    id: 1,
    name: 'Nood Creators',
    description: 'A community for all Nood creators to share their work and get feedback',
    memberCount: 5243,
    avatar: '/communities/creators.jpg',
    banner: '/communities/banners/creators.jpg',
    isPrivate: false
  },
  {
    id: 2,
    name: 'Nood Beginners',
    description: 'Just getting started with Nood? Join us to learn the basics!',
    memberCount: 12658,
    avatar: '/communities/beginners.jpg',
    banner: '/communities/banners/beginners.jpg',
    isPrivate: false
  },
  {
    id: 3,
    name: 'Nood Professionals',
    description: 'For experienced Nood users looking to advance their skills',
    memberCount: 2976,
    avatar: '/communities/professionals.jpg',
    banner: '/communities/banners/professionals.jpg',
    isPrivate: false
  },
  {
    id: 4,
    name: 'Nood Jobs',
    description: 'Find work opportunities related to Nood',
    memberCount: 4189,
    avatar: '/communities/jobs.jpg',
    banner: '/communities/banners/jobs.jpg',
    isPrivate: false
  }
];

// API methods
export const fetchPosts = async () => {
  await delay(800); // Simulate network delay
  return dummyPosts;
};

export const fetchPostById = async (id) => {
  await delay(500);
  return dummyPosts.find(post => post.id === parseInt(id));
};

export const fetchTrendingCommunities = async () => {
  await delay(800);
  return dummyCommunities.sort((a, b) => b.memberCount - a.memberCount).slice(0, 3);
};

export const fetchCommunityById = async (id) => {
  await delay(600);
  return dummyCommunities.find(community => community.id === parseInt(id));
};

export const fetchUserProfile = async (id) => {
  await delay(700);
  // Dummy user data
  return {
    id: parseInt(id),
    name: 'Jane Smith',
    username: 'janesmith',
    bio: 'Nood enthusiast and community builder',
    avatar: '/avatars/user1.jpg',
    coverPhoto: '/covers/user1.jpg',
    joinDate: '2022-11-15T00:00:00Z',
    stats: {
      posts: 28,
      following: 145,
      followers: 89
    }
  };
};

export const login = async (email, password) => {
  await delay(1000);
  if (email === 'user@example.com' && password === 'password') {
    return {
      id: 101,
      name: 'Jane Smith',
      email: 'user@example.com',
      token: 'dummy-auth-token-12345'
    };
  }
  throw new Error('Invalid credentials');
};

export const register = async (name, email, password) => {
  await delay(1200);
  return {
    id: 105,
    name,
    email,
    token: 'dummy-auth-token-new-user'
  };
};

export const createPost = async (postData) => {
  await delay(900);
  const newPost = {
    id: dummyPosts.length + 1,
    author: {
      id: 101,
      name: 'Jane Smith',
      avatar: '/avatars/user1.jpg'
    },
    community: {
      id: postData.communityId,
      name: dummyCommunities.find(c => c.id === postData.communityId)?.name || 'Unknown Community'
    },
    content: postData.content,
    images: postData.images || [],
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    isPinned: false
  };
  
  return newPost;
};

export const createCommunity = async (communityData) => {
  await delay(1000);
  const newCommunity = {
    id: dummyCommunities.length + 1,
    name: communityData.name,
    description: communityData.description,
    memberCount: 1,
    avatar: communityData.avatar || '/communities/default.jpg',
    banner: communityData.banner || '/communities/banners/default.jpg',
    isPrivate: communityData.isPrivate || false
  };
  
  return newCommunity;
}; 