import {
  Reorder,
  motion,
  useDragControls,
  AnimatePresence,
} from "framer-motion";
import CheckBox from "../CheckBox";
import { MdOutlineDragIndicator } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { useState } from "react";
import { Todo as TodoType } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditModal from "../EditModal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface TodoProps {
  todo: TodoType | undefined | null;
  setTodos?: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function Todo({ todo, setTodos }: TodoProps) {
  const dragControls = useDragControls();
  const isComplete = todo?.completed ?? false;
  const id = todo?.id || 0;
  const [editModal, setEditModal] = useState(false);
  const router = useRouter();

  const handleDeleteTodo = async () => {
    try {
      await toast.promise(
        axios
          .delete(`/api/handleTodo`, {
            data: {
              todoId: id,
            },
          })
          .then((res) => {
            console.log(res.data);
            setTodos?.((prev) =>
              prev.filter((prevTodo) => prevTodo.id !== res.data.id)
            );
          }),
        {
          loading: "Deleting...",
          success: "Deleted",
          error: (error) => {
            console.log(error);
            return "Something went wrong";
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const hanleCompleteTodo = async () => {
    try {
      await toast.promise(
        axios
          .put("/api/completeTodo", {
            todoId: id,
            completed: !isComplete,
          })
          .then((res) => {
            console.log(res.data);
            setTodos?.((prev) =>
              prev.map((prevTodo) =>
                prevTodo.id === res.data.id ? res.data : prevTodo
              )
            );
          }),
        {
          loading: "Completing...",
          success: isComplete ? "Uncompleted" : "Completed",
          error: (error) => {
            return error.response.data.error;
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Reorder.Item
        dragListener={false}
        dragControls={dragControls}
        as="div"
        value={todo}
        id={todo?.id.toString()}
      >
        <motion.div
          className={`group w-full p-5 bg-mainColor flex items-center border-b-2 border-[hsl(235,_18%,_26%)] transition-all duration-300 relative`}
        >
          <CheckBox
            checked={isComplete}
            className="absolute"
            onClick={() => {
              hanleCompleteTodo();
            }}
          />
          <p
            className={`w-full h-full text-[clamp(1rem,_3vw,_1.25rem)] select-none bg-MainColor ml-10 leading-[0] ${
              isComplete && "line-through text-completed"
            }`}
          >
            {todo?.content}
          </p>
          <motion.div
            onPointerDown={(event) => {
              dragControls?.start(event);
              event.preventDefault();
            }}
            className="flex gap-4 group items-center"
          >
            <FiEdit3
              size={20}
              className={`cursor-pointer group-hover:opacity-75 hover:scale-105 transition-all duration-500 text-Text opacity-0 ml-auto `}
              onClick={() => {
                setEditModal(true);
              }}
            />
            <FaTrash
              size={20}
              className={`cursor-pointer group-hover:opacity-75 transition-all duration-500 text-Text hover:text-red-500 opacity-0 ml-auto `}
              onClick={() => {
                handleDeleteTodo();
              }}
            />
            <MdOutlineDragIndicator
              size={24}
              className={`hover:opacity-100 transition-all duration-500 text-Text opacity-50 cursor-grab`}
            />
          </motion.div>
        </motion.div>
      </Reorder.Item>
      <AnimatePresence mode="wait">
        {editModal && (
          <EditModal
            isOpen={editModal}
            setIsOpen={setEditModal}
            todo={todo}
            setTodos={setTodos}
          />
        )}
      </AnimatePresence>
    </>
  );
}
