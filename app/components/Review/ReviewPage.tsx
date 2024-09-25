import React, { useRef, useState, useEffect } from "react";

// Types for user and comment data
interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

interface Comment {
  text: string;
  comment: string;
  color: string;
  id: string;
  timestamp: string;
  userId: string;
  characterRange: { start: number | null; end: number | null };
}

// Custom hook for retrieving the user data
const useUser = (): User => {
  const [user, setUser] = useState<User>({
    id: "user123",
    name: "John Doe",
    avatar: "/cat.png",
    email: "johndoe@gmail.com",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return user;
};

// Custom hook for managing comments and text
const useComments = (textUrl: string) => {
  const [textData, setTextData] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedText, setSelectedText] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [highlightColor, setHighlightColor] = useState<string>("#ffff00");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [characterRange, setCharacterRange] = useState<{
    start: number | null;
    end: number | null;
  }>({
    start: null,
    end: null,
  });
  console.log({ comments, selectedText });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(textUrl);
        const data = await response.text();
        const storedComments = JSON.parse(
          localStorage.getItem("comments") || "[]"
        );
        const content = highlightStoredComments(data, storedComments) as string;
        setComments(storedComments);
        setTextData(content);
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchData();
    const storedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(storedComments);

    highlightStoredComments(storedComments, []);
  }, [textUrl]);

  const highlightStoredComments = (
    textData: string,
    storedComments: Comment[]
  ): string => {
    let updatedText = textData;
    let offset = 0; // Keeps track of how the length changes as we insert <mark> tags.
  
    // Sort the comments by their starting character range so that earlier positions are processed first.
    storedComments.sort(
      (a, b) => (a.characterRange.start ?? 0) - (b.characterRange.start ?? 0)
    );
  
    storedComments.forEach((comment) => {
      const start = comment.characterRange.start;
      const end = comment.characterRange.end;
  
      // Only proceed if the character range is valid
      if (start !== null && end !== null && start >= 0 && end <= updatedText.length) {
        const targetText = updatedText.slice(start + offset, end + offset); // Get the text within the range
  
        // Create the <mark> tag with the comment's color and id
        const markedText = `<mark id="${comment.id}" style="background-color: ${comment.color}">${targetText}</mark>`;
  
        // Replace the text in the range with the markedText
        updatedText =
          updatedText.slice(0, start + offset) + // Text before the target
          markedText + // The marked highlighted text
          updatedText.slice(end + offset); // Text after the target
  
        // Adjust the offset to account for the added length of the <mark> tags
        offset += markedText.length - targetText.length;
      }
    });
  
    return updatedText;
  };
  

  // Helper function to escape special characters in the string for use in a regex

  const updateComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  const addOrEditComment = (userId: string) => {
    if (selectedText && comment) {
      const updatedComments = [...comments];
      const timestamp = new Date().toLocaleString();

      if (editIndex !== null) {
        updatedComments[editIndex] = {
          ...updatedComments[editIndex],
          comment,
          color: highlightColor,
          characterRange,
        };
        setEditIndex(null);
      } else {
        const highlightedHtml = textData.replace(
          selectedText,
          `<mark id="highlight-${comments.length}" style="background-color: ${highlightColor}">${selectedText}</mark>`
        );
        setTextData(highlightedHtml);
        updatedComments.push({
          text: selectedText,
          comment,
          color: highlightColor,
          id: `highlight-${comments.length}`,
          timestamp,
          userId,
          characterRange,
        });
      }

      updateComments(updatedComments);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedText("");
    setComment("");
  };

  const handleEditComment = (index: number) => {
    setEditIndex(index);
    setSelectedText(comments[index].text);
    setComment(comments[index].comment);
    setHighlightColor(comments[index].color);
    setCharacterRange(comments[index].characterRange);
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    updateComments(updatedComments);
    resetHighlights(updatedComments);
  };

  const resetHighlights = (updatedComments: Comment[]) => {
    let updatedText = textData.replace(/<\/?mark[^>]*>/g, "");
    updatedComments.forEach((comment) => {
      updatedText = updatedText.replace(
        comment.text,
        `<mark id="${comment.id}" style="background-color: ${comment.color}">${comment.text}</mark>`
      );
    });
    setTextData(updatedText);
  };

  return {
    textData,
    comments,
    selectedText,
    comment,
    highlightColor,
    editIndex,
    characterRange,
    setSelectedText,
    setComment,
    setHighlightColor,
    addOrEditComment,
    handleEditComment,
    handleDeleteComment,
    setCharacterRange,
  };
};

// Comment card component
interface CommentCardProps {
  item: Comment;
  user: User;
  onEdit: () => void;
  onDelete: () => void;
  onScroll: (id: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  item,
  onEdit,
  onDelete,
  onScroll,
  user,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow h-full">
      <div className="flex items-center mb-2">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <strong className="text-blue-600 hover:underline">
              {user.name}
            </strong>
            <span className="text-gray-600 hover:underline font-sm">
              {user.email}
            </span>
          </div>
          <span className="text-gray-500 text-sm ml-2">{item.timestamp}</span>
        </div>
      </div>
      <strong
        className="text-blue-600 hover:underline"
        onClick={() => onScroll(item.id)}
      >
        {item.text}
      </strong>
      <p className="text-gray-700 my-2" onClick={() => onScroll(item.id)}>
        {item.comment}
      </p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:underline px-2 py-1 rounded border border-blue-500"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:underline px-2 py-1 rounded border border-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Main review system component
interface ReviewSystemProps {
  textUrl: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ textUrl }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const [showPopover, setShowPopover] = useState(false);

  const {
    textData,
    comments,
    selectedText,
    comment,
    highlightColor,
    editIndex,
    setSelectedText,
    setCharacterRange,
    setComment,
    setHighlightColor,
    addOrEditComment,
    handleEditComment,
    handleDeleteComment,
  } = useComments(textUrl);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selected = selection?.toString();
    const range = selection?.getRangeAt(0);

    if (selected && range) {
      setSelectedText(selected);
      setCharacterRange({ start: range.startOffset, end: range.endOffset });
      setHighlightColor("#ffff00");
      setShowPopover(true);
    }
  };

  const scrollToComment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="w-full md:w-7/12 p-4 border-b md:border-r border-gray-300 relative h-[72%] overflow-y-scroll top-[96px]"
        onMouseUp={handleTextSelection}
        ref={textRef}
        dangerouslySetInnerHTML={{ __html: textData }}
      />

      <div
        className={`fixed bottom-0 sm:bottom-auto right-0 w-full md:w-5/12 bg-white p-4 transition-transform ${
          showPopover ? "translate-y-0 " : "translate-y-full"
        } md:translate-y-0  md:overflow-y-auto scrollable md:h-[71%] h-[34rem]  md:top-[70px]`}
      >
        <div
          className={`max-h-80 md:max-h-full overflow-y-auto ${
            showPopover ? "block" : "hidden"
          } md:block scrollable`}
        >
          {showPopover && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold">
                {editIndex !== null ? "Edit Comment" : "Add Comment"}
              </h4>
              <p className="italic">{selectedText}</p>
              <div className="mb-4">
                <h5 className="font-medium">Choose Highlight Color</h5>
                <div className="flex space-x-2">
                  {[
                    "#ffff00",
                    "#ffcccb",
                    "#90ee90",
                    "#add8e6",
                    "#ffb6c1",
                    "#f08080",
                  ].map((color) => (
                    <div
                      key={color}
                      onClick={() => setHighlightColor(color)}
                      className={`w-8 h-8 rounded cursor-pointer ${
                        highlightColor === color
                          ? "border-2 border-black"
                          : "border"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                rows={4}
                className="w-full border border-gray-300 p-2 mb-2 rounded"
              />
              <button
                onClick={() => addOrEditComment(user.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editIndex !== null ? "Update Comment" : "Add Comment"}
              </button>
            </div>
          )}
          <h3 className="text-xl font-semibold mt-4">Comments</h3>
          <div className="mt-4">
            {comments.map((item, index) => (
              <CommentCard
                key={index}
                item={item}
                user={user}
                onEdit={() => handleEditComment(index)}
                onDelete={() => handleDeleteComment(index)}
                onScroll={scrollToComment}
              />
            ))}
          </div>
          {comments.length < 1 && (
            <div>
              <i>No comments have been added yet!</i>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setShowPopover(!showPopover)}
        className={`fixed bottom-4 right-4 bg-blue-500 md:hidden text-white rounded-full p-3 shadow-lg transform -translate-y-20 transition-all duration-300  `}
      >
        {showPopover ? "Close" : "Add Comment"}
      </button>
    </div>
  );
};

export default ReviewSystem;
