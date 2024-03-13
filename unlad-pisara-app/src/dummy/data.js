import { CheckCircle, PackageIcon, PauseCircleIcon, PlayIcon } from 'lucide-react'

export const dummyProjects = [
    { id: 1, name: 'SM Marikina', code: '0001', date: '2024-02-18' },
    { id: 2, name: 'SM Lopez', code: '0002', date: '2024-02-17' },
    { id: 3, name: 'SM San Pablo', code: '0003', date: '2024-02-16' },
    { id: 4, name: 'DD Meridian Tower', code: '0004', date: '2024-02-15' },
    { id: 5, name: 'SM Gold Reso', code: '0005', date: '2024-02-14' },
  ];

// Mocked data on gantt chart
export const mockedSchedulerData = [
    {
        id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
        label: {
            icon: "https://picsum.photos/24",
            title: "Joshua Flores",
            subtitle: "Frontend Developer"
        },
        data: [
            {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
                startDate: new Date("2023-04-13T15:31:24.272Z"),
                endDate: new Date("2023-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Project A",
                subtitle: "Subtitle A",
                description: "Array indexing Salad West Account",
                progress: 100,
                weight: 30,
                bgColor: "#6CB2EB" // Light Blue
            },
        ]
    },
    {
        id: "1a33f2d3-5e66-4e88-a676-31215d71b6c2",
        label: {
            icon: "https://picsum.photos/24",
            title: "Dariel Avila",
            subtitle: "Backend Developer"
        },
        data: [
            {
                id: "ef3a1c7b-7a1c-4f85-b75f-3b3f7d1621a1",
                startDate: new Date("2023-05-20T08:00:00.000Z"),
                endDate: new Date("2023-06-30T17:00:00.000Z"),
                occupancy: 4800,
                title: "Project B",
                subtitle: "Subtitle B",
                description: "Database optimization",
                progress: 10,
                weight: 83,
                bgColor: "#BA68C8" // Light Purple
            },
        ]
    },
    {
        id: "2a9f4d23-8847-4e44-aae3-5037cb127e7d",
        label: {
            icon: "https://picsum.photos/24",
            title: "Maria Santos",
            subtitle: "UI/UX Designer"
        },
        data: [
            {
                id: "0cfc1b49-8715-4329-9d1f-d417db8f9d03",
                startDate: new Date("2023-07-10T10:00:00.000Z"),
                endDate: new Date("2023-08-15T18:00:00.000Z"),
                occupancy: 4000,
                title: "Project C",
                subtitle: "Subtitle C",
                description: "UI wireframing",
                progress: 80,
                weight: 10,
                bgColor: "#FFD54F" // Light Yellow
            },
        ]
    },
    {
        id: "3a7e8b3c-9c0e-4c7d-95e6-c0b1a52594a2",
        label: {
            icon: "https://picsum.photos/24",
            title: "Miguel Cruz",
            subtitle: "Full Stack Developer"
        },
        data: [
            {
                id: "d9ff4e12-229c-4197-b378-d4173bea2409",
                startDate: new Date("2023-08-01T08:00:00.000Z"),
                endDate: new Date("2023-09-30T17:00:00.000Z"),
                occupancy: 7200,
                title: "Project D",
                subtitle: "Subtitle D",
                description: "Full stack development",
                progress: 10,
                weight: 1,
                bgColor: "#FFB74D" // Light Orange
            },
        ]
    },
    {
        id: "4b25f21e-88a0-4dc9-9eac-3b7f9c56aafc",
        label: {
            icon: "https://picsum.photos/24",
            title: "Ana Reyes",
            subtitle: "Product Manager"
        },
        data: [
            {
                id: "7a8e92a2-4e15-4538-aa25-1a684f2cf3d5",
                startDate: new Date("2023-10-01T09:00:00.000Z"),
                endDate: new Date("2023-11-15T17:00:00.000Z"),
                occupancy: 6000,
                title: "Project E",
                subtitle: "Subtitle E",
                description: "Product roadmap planning",
                progress: 70,
                weight: 30,
                bgColor: "#EF5350" // Light Red
            },
        ]
    },
    {
        id: "5cfc34d3-03ae-412e-8bc9-720a2c5d962a",
        label: {
            icon: "https://picsum.photos/24",
            title: "Ramon Santos",
            subtitle: "DevOps Engineer"
        },
        data: [
            {
                id: "f5bf433c-1200-45c0-bce1-108490d1a914",
                startDate: new Date("2023-11-01T09:00:00.000Z"),
                endDate: new Date("2023-12-31T17:00:00.000Z"),
                occupancy: 8400,
                title: "Project F",
                subtitle: "Subtitle F",
                description: "Infrastructure optimization",
                progress: 65,
                weight: 13,
                bgColor: "#6CB2EB" // Light Blue
            },
        ]
    },
    {
        id: "6d0f8ae5-bdd7-458b-b27c-9e96f76812ef",
        label: {
            icon: "https://picsum.photos/24",
            title: "Elena Garcia",
            subtitle: "Data Scientist"
        },
        data: [
            {
                id: "e0c6f3ae-30a5-418b-858e-99e702da26e1",
                startDate: new Date("2023-12-01T10:00:00.000Z"),
                endDate: new Date("2024-01-15T18:00:00.000Z"),
                occupancy: 6000,
                title: "Project G",
                subtitle: "Subtitle G",
                description: "Data analysis",
                progress: 60,
                weight: 30,
                bgColor: "#A2D729" // Light Green
            },
        ]
    },
    {
        id: "7f6b12af-547b-4053-9d6c-6a0a6863a30a",
        label: {
            icon: "https://picsum.photos/24",
            title: "Carmen Reyes",
            subtitle: "QA Engineer"
        },
        data: [
            {
                id: "17fbf002-c769-4f05-b5b7-c3075c69d675",
                startDate: new Date("2024-01-01T08:00:00.000Z"),
                endDate: new Date("2024-02-29T17:00:00.000Z"),
                occupancy: 7200,
                title: "Project H",
                subtitle: "Subtitle H",
                description: "Quality assurance testing",
                progress: 60,
                weight: 30,
                bgColor: "#BA68C8" // Light Purple
            },
        ]
    },
    {
        id: "8e4b6789-1059-4e06-b4a5-77e6f29c05c0",
        label: {
            icon: "https://picsum.photos/24",
            title: "Jose Lopez",
            subtitle: "Systems Analyst"
        },
        data: [
            {
                id: "99f20b82-7022-4130-9d47-18696efeb0e3",
                startDate: new Date("2024-03-01T09:00:00.000Z"),
                endDate: new Date("2024-04-30T17:00:00.000Z"),
                occupancy: 8400,
                title: "Project I",
                subtitle: "Subtitle I",
                description: "System requirements analysis",
                progress: 60,
                weight: 30,
                bgColor: "#FFD54F" // Light Yellow
            },
        ]
    },
    {
        id: "9d3f3c68-6aa9-4a61-b35b-63e47acae6cd",
        label: {
            icon: "https://picsum.photos/24",
            title: "Manuel Gonzales",
            subtitle: "Business Analyst"
        },
        data: [
            {
                id: "584c10d3-47fc-442f-aaec-f4d29df6404c",
                startDate: new Date("2024-05-01T08:00:00.000Z"),
                endDate: new Date("2024-06-30T17:00:00.000Z"),
                occupancy: 9600,
                title: "Project J",
                subtitle: "Subtitle J",
                description: "Market analysis",
                progress: 60,
                weight: 30,
                bgColor: "#FFB74D" // Light Orange
            },
        ]
    },
];

export const notificationData = [
    {
      id: 1,
      title: "New Message",
      description: "You have received a new message from John Doe.",
      timestamp: new Date("2024-02-27T08:00:00"),
      isRead: false
    },
    {
      id: 2,
      title: "New Comment",
      description: "John Doe commented on your post.",
      timestamp: new Date("2024-02-26T12:30:00"),
      isRead: true
    },
    {
      id: 3,
      title: "Reminder",
      description: "Your meeting starts in 1 hour.",
      timestamp: new Date("2024-02-25T14:00:00"),
      isRead: false
    },
    
  ];
  

export const profileData = {
    name: "Joshua Flores",
    username: "joshuaflores",
    email: "joshuflores.garlan@gmail.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Gumaca, Quezon",
    avatarUrl: "https://via.placeholder.com/150", 
  };

  export const progressData = [
    { groupName: "Group A", progress: 70 },
    { groupName: "Group B", progress: 50 },
    { groupName: "Group C", progress: 30 },
    
  ];
  

  export const statusData = [
    {
      group: "Group 1",
      projects: [
        {
          name: "CENTURY SPIRE",
          status: [
            "Ongoing Construction",
            "Ongoing Construction",
            "Ongoing Construction",
            "For submission GF site visit report tomorrow Aug. 8, 2023.",
            "8/17/2023 - sent LGF Food Court Switching Layout",
          ]
        },
        {
          name: "GLAS OFFICE TOWER",
          status: [
            "Ongoing Construction",
            "For follow-up on the project status.",
            "Awaiting on the response",
            "Followed-up on project status. Awaiting on the response.",
            "Followed-up on project status. Awaiting on the response."
          ]
        },
        // Add more projects here...
      ]
    },
    // Add more groups here...
  ];


  //New Dashboard Data
  
  export const statusData1 = {
    totalProjects: 17,
    projectsInProgress: 15,
    completedProjects: 2,
    projectsOnHold: 1
  };

  export const cardData = [
    { 
      title: "Total Projects", 
      value: statusData1.totalProjects, 
      icon: PackageIcon, 
      description: "Total number of projects in the system." 
    },
    { 
      title: "Projects in Progress", 
      value: statusData1.projectsInProgress, 
      icon: PlayIcon, 
      description: "Number of projects in progress." 
    },
    { 
      title: "Completed Projects", 
      value: statusData1.completedProjects, 
      icon: CheckCircle, 
      description: "Number of projects completed." 
    },
    { 
      title: "Projects On Hold", 
      value: statusData1.projectsOnHold, 
      icon: PauseCircleIcon, 
      description: "Number of projects currently on hold." 
    }
  ];


  export const projectProgressByStage = [
    {
      stage: "Schematic Design Phase",
      totalProjects: 3,
      averageProgress: 17
    },
    {
      stage: "Design Development Phase",
      totalProjects: 3,
      averageProgress: 16
    },
    {
      stage: "Tender Document Phase",
      totalProjects: 4,
      averageProgress: 8
    },
    {
      stage: "Tender Evaluation / Construction Administration",
      totalProjects: 7,
      averageProgress: 20
    }
  ];
  
  console.log("Project Progress by Stage:");
  projectProgressByStage.forEach(stage => {
    console.log("Stage:", stage.stage);
    console.log("Total Projects:", stage.totalProjects);
    console.log("Average Progress:", stage.averageProgress + "%");
  });

  export const projectAgingAnalysis = {
    averageDaysSinceStart: {
      minimum: 14,
      maximum: 2167,
      average: 898
    },
    projectsOverdue: {
      totalProjects: 9,
      averageOverdueDays: 674
    }
  };

  export const projectStatus = {
    projectName: "Century Spire",
    stage: "Tender Evaluation / Construction Administration",
    progress: "0%",
    startDate: "2/11/2021",
    projectedEndDate: "12/31/2019",
    actualEndDate: "3/6/2024",
    aging: 1527,
    currentStatus: "Ongoing Construction",
    latestUpdates: [
      "Project turned over in 2023.",
      "To submit COC."
    ]
  };

  // User dummy data
export const dummyProfile = {
  name: "Joshua Flores",
  email: "joshuaflores@gmail.com",
  avatarSrc: "https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-1/418782011_3598003387134419_4388420038133548678_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFP0-u_t7dUJQSe3c0K738bDyyzb0mVKZUPLLNvSZUplfJ-9_LgR3S91HgQ0QQnbuMX4EDNRGVVHiGELeTRJgO5&_nc_ohc=WKQqnmH3fB8AX9i7IGj&_nc_ht=scontent.fmnl3-2.fna&oh=00_AfAyd-zioGG21hZHTfL6_p_TpFJmF0Gs0NgaC4UnPJMpQg&oe=65EFCD07",
  menuItems: [
    { label: "View Profile", link: "/dashboard" },
    { label: "Settings", link: "/settings" },
    // Add more if you want :)
  ],
};


  
  

  