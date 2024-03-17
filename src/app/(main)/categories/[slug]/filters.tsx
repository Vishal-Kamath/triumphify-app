import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { FC } from "react";

const FiltersSidebar: FC = () => {
  return (
    <Sidebar>
      <div className="h-full w-full max-w-xs rounded-md border-1 border-purple-300 bg-gradient-to-b from-purple-50 to-white p-3">
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
        <Button>Test</Button>
      </div>
    </Sidebar>
  );
};

export default FiltersSidebar;
