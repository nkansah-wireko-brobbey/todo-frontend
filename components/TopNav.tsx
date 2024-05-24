import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import Search from "./Search"
    import Account from "./Account"
  
const TopNav = () => {
  return (
   <div className="main-navigation">
    <div className="flex items-center gap-4">

        <div className="logo">
            Task
        </div>
        <div>
        <Search />

        </div>
        </div>
        <div className="account">
            <Account />
        </div>
   </div>

  )
}

export default TopNav