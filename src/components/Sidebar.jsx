import {
  LayoutDashboard,
  Shirt,
  Compass,
  Bookmark,
  Sparkles,
  Heart,
  Droplets,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Shirt, label: "Wardrobe", active: true },
  { icon: Compass, label: "Discovery" },
  { icon: Bookmark, label: "Saved Looks" },
  { icon: Sparkles, label: "AI Stylist" },
];

const moreItems = [
  { icon: Heart, label: "Wishlist" },
  { icon: Droplets, label: "Wardrobe Care" },
  { icon: Settings, label: "Settings" },
];

function NavItem({ icon: Icon, label, active }) {
  return (
    <button
      className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
        active
          ? "text-text-primary bg-white/[0.06]"
          : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
      )}
      <Icon size={18} className={active ? "text-accent" : ""} strokeWidth={1.5} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-[252px] flex-shrink-0 bg-bg-sidebar border-r border-border-subtle flex flex-col z-20">
      <div className="px-6" style={{ paddingTop: 30 }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Shirt size={17} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-[17px] font-semibold text-text-primary tracking-tight">
            StyleVault
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <p className="px-3 mb- mt-5 text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">
          Menu
        </p>
        <div className="space-y-1.5 mb-10">
          {menuItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>

        <p className="px-3 mb-3.5 text-[10px] font-semibold tracking-[0.12em] text-text-muted uppercase">
          More
        </p>
        <div className="space-y-1.5">
          {moreItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </nav>

      <div className="px-5 py-6.5 border-t border-border-subtle bg-bg-sidebar">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-bg-card border border-border overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-medium text-text-primary truncate">Admin</p>
            <p className="text-[11px] text-text-muted truncate">admin01@gmail.com</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
