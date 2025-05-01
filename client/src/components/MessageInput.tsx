import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { useChatStore } from "../Pages/chat/store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        // image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full text-black dark:text-white">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700 dark:border-zinc-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700
              flex items-center justify-center"
              type="button"
              title="Remove image"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md bg-gray-100 dark:bg-gray-800"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            title="Upload an image"
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle bg-slate-50 dark:bg-gray-700
                     ${imagePreview ? "text-emerald-500" : "text-zinc-800 dark:text-zinc-300"}`}
            onClick={() => fileInputRef.current?.click()}
            title="Upload an image"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn sm:flex btn-circle bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-400  dark:bg-gray-700"
          disabled={!text.trim() && !imagePreview}
          title="Send message"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;