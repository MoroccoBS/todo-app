import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";
import { AiOutlineEnter } from "react-icons/ai";
export default function ToolTip() {
  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={200}>
      <Tooltip>
        <TooltipTrigger className="cursor-auto">
          <AlertCircle className="w-5 opacity-30 hover:opacity-100 transition-all" />
        </TooltipTrigger>
        <TooltipContent className="bg-mainColor text-foreground/75">
          <p className="flex text-base">
            Hit Enter <AiOutlineEnter className="mx-2 translate-y-[3px]" /> to
            add a todo!
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
