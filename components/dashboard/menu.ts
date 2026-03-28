import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  Building2,
  Tags,
  Wrench,
  LocationEdit
} from "lucide-react"

export type MenuItem = {
  label: string
  href?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
  children?: {
    label: string
    href: string
  }[]
}

export type MenuSection = {
  title: string
  items: MenuItem[]
}

export const adminMenu: MenuSection[] = [

  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "User Management",
    items: [
      {
        label: "Users",
        icon: Users,
        children: [
          {
            label: "All Users",
            href: "/dashboard/admin/users",
          },
          {
            label: "Employers",
            href: "/dashboard/admin/users/employers",
          },
        ],
      },

      
    ],
  },

  {
    title: "Job Management",
    items: [
      

      {
        label: "Applications",
        href: "/dashboard/admin/applications",
        icon: FileText,
      },
    ],
  },

  {
    title: "Job Metadata",
    items: [
      {
        label: "Categories",
        href: "/dashboard/admin/job-categories",
        icon: Tags,
      },

       {
        label: "Locations",
        href: "/dashboard/admin/locations",
        icon: LocationEdit,
      },

      {
        label: "Skills",
        href: "/dashboard/admin/skills",
        icon: Wrench,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        label: "Settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
      },
    ],
  },
]

export const employerMenu: MenuSection[] = [
  {
    title: "Recruitment",
    items: [
      {
        label: "My Jobs",
        href: "/dashboard/employer/jobs",
        icon: Briefcase,
      },

      {
        label: "Applications",
        href: "/dashboard/employer/applications",
        icon: FileText,
      },

      {
        label: "Company Profile",
        href: "/dashboard/employer/companies",
        icon: Building2,
        
      },
      {
        label: "Skills",
        href: "/dashboard/employer/skills",
        icon: Wrench,
      },
    ],
  },
 
]