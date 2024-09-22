// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';

const useComments = (textUrl) => {
    const [textData, setTextData] = useState('');
    const [comments, setComments] = useState([]);
    const [selectedText, setSelectedText] = useState('');
    const [comment, setComment] = useState('');
    const [highlightColor, setHighlightColor] = useState('#ffff00');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(textUrl);
                const data = await response.text();
                const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
                const content = highlightStoredComments(data, storedComments)
                setComments(storedComments);
                setTextData(content);
            } catch (error) {
                console.error('Error fetching text:', error);
            }
        };

        fetchData();
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments);

        // Highlight stored comments in the text data
        highlightStoredComments(storedComments);
    }, [textUrl]);

    const highlightStoredComments = (textData, storedComments) => {
        let updatedText = textData;
        storedComments?.forEach((comment) => {
            updatedText = updatedText.replace(
                comment.text,
                `<mark id="${comment.id}" style="background-color: ${comment.color}">${comment.text}</mark>`
            );
        });
        return updatedText;
    };

    const updateComments = (newComments) => {
        setComments(newComments);
        localStorage.setItem('comments', JSON.stringify(newComments));
    };

    const addOrEditComment = () => {
        if (selectedText && comment) {
            const updatedComments = [...comments];

            if (editIndex !== null) {
                updatedComments[editIndex] = { ...updatedComments[editIndex], comment, color: highlightColor };
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
                });
            }

            updateComments(updatedComments);
            resetForm();
        }
    };

    const resetForm = () => {
        setSelectedText('');
        setComment('');
    };

    const handleEditComment = (index) => {
        setEditIndex(index);
        setSelectedText(comments[index].text);
        setComment(comments[index].comment);
        setHighlightColor(comments[index].color);
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        updateComments(updatedComments);
        resetHighlights(updatedComments);
    };

    const resetHighlights = (updatedComments) => {
        let updatedText = textData.replace(/<\/?mark[^>]*>/g, '');
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
        setSelectedText,
        setComment,
        setHighlightColor,
        addOrEditComment,
        handleEditComment,
        handleDeleteComment,
    };
};

const ReviewSystem = ({ textUrl }) => {
    const textRef = useRef(null);
    const [showPopover, setShowPopover] = useState(false);

    const {
        textData,
        comments,
        selectedText,
        comment,
        highlightColor,
        editIndex,
        setSelectedText,
        setComment,
        setHighlightColor,
        addOrEditComment,
        handleEditComment,
        handleDeleteComment,
    } = useComments(textUrl);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const selected = selection.toString();

        if (selected) {
            setSelectedText(selected);
            setHighlightColor('#ffff00'); // Reset to default color
            setShowPopover(true); // Show add comment popover
        }
    };

    const scrollToComment = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Left side: Display text */}
            <div
                className="w-full md:w-7/12 p-4 border-b md:border-r border-gray-300 relative"
                onMouseUp={handleTextSelection}
                ref={textRef}
                dangerouslySetInnerHTML={{ __html: textData }}
            />

            {/* Right side: Display comments */}
            <div className={`fixed bottom-0 sm:bottom-auto right-0 w-full md:w-5/12 bg-white p-4 transition-transform ${showPopover ? 'translate-y-0' : 'translate-y-full'} md:translate-y-0 md:h-auto md:overflow-visible`}>
                <div className={`max-h-80 md:max-h-none overflow-y-auto ${showPopover ? 'block' : 'hidden'} md:block`}>
                    {showPopover && (
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold">{editIndex !== null ? 'Edit Comment' : 'Add Comment'}</h4>
                            <p className="italic">{selectedText}</p>
                            <div className="mb-2">
                                <h5 className="font-medium">Choose Highlight Color</h5>
                                <div className="flex space-x-2">
                                    {['#ffff00', '#ffcccb', '#90ee90', '#add8e6', '#ffb6c1', '#f08080'].map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => setHighlightColor(color)}
                                            className={`w-8 h-8 rounded cursor-pointer ${highlightColor === color ? 'border-2 border-black' : 'border'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                rows="4"
                                className="w-full border border-gray-300 p-2 mb-2"
                            />
                            <button
                                onClick={addOrEditComment}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {editIndex !== null ? 'Update Comment' : 'Add Comment'}
                            </button>
                        </div>
                    )}
                    <h3 className="text-xl font-semibold mt-4">Comments</h3>
                    <div className="mt-4">
                        {comments.map((item, index) => (
                            <div key={index} className="mb-2 cursor-pointer">
                                <strong className="text-blue-600 hover:underline" onClick={() => scrollToComment(item.id)}>
                                    {item.text}
                                </strong>
                                <p className="text-gray-700" onClick={() => scrollToComment(item.id)}>
                                    {item.comment}
                                </p>
                                <button
                                    onClick={() => handleEditComment(index)}
                                    className="text-blue-500 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteComment(index)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating button for mobile view */}
            <button
                onClick={() => setShowPopover(!showPopover)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg md:hidden"
            >
                {showPopover ? 'Close' : 'Comments'}
            </button>
        </div>
    );
};

export default ReviewSystem;

