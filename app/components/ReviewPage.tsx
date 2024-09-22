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
                setTextData(data);
            } catch (error) {
                console.error('Error fetching text:', error);
            }
        };

        fetchData();
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments);
    }, [textUrl]);

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
        updatedComments.forEach((comment, i) => {
            updatedText = updatedText.replace(
                comment.text,
                `<mark id="highlight-${i}" style="background-color: ${comment.color}">${comment.text}</mark>`
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
    const commentsRef = useRef(null);

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

            if (commentsRef.current) {
                commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const scrollToComment = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="flex">
            {/* Left side: Display text */}
            <div
                className="w-7/12 p-4 border-r border-gray-300 relative"
                onMouseUp={handleTextSelection}
                ref={textRef}
                dangerouslySetInnerHTML={{ __html: textData }}
            />

            {/* Right side: Display comments */}
            <div className="flex flex-col w-5/12 fixed max-h-screen overflow-y-scroll right-0 bg-white p-4">
                <div ref={commentsRef}>
                    {selectedText && (
                        <div>
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
        </div>
    );
};

export default ReviewSystem;
