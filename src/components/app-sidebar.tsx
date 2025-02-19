import { Calendar, Home, icons, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Expenses",
    url: "/expense",
    icon: Inbox,
  },
  {
    title: "Budget",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Analytics",
    url: "#",
    icon: Search,
  },
  {
    title:"Goals",
    url:"#",
    icon:icons.Goal,
  },
  {
    title: "Recommendations",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#16251F]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-white">Finance Tracker</SidebarGroupLabel>
          <p className="text-gray-400 ml-4 ">2025 Personal Budget</p>
          <SidebarGroupContent className="mt-8 ml-2">
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-[#45ad80]" asChild>
                    <a href={item.url}>
                      <item.icon className="text-white"/>
                      <span className="text-white text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
