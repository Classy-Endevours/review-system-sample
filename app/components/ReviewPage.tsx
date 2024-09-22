// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

function extractMarkContent(inputString) {
    const regex = /<mark.*?>(.*?)<\/mark>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(inputString)) !== null) {
        matches.push(match[1]); // Capture the content inside <mark>...</mark>
    }

    return matches;
}

const ReviewSystem = ({ textUrl }) => {
    const [textData, setTextData] = useState(''); // Holds the text data
    const [comments, setComments] = useState([]); // Holds comments
    const [selectedText, setSelectedText] = useState(''); // Holds the selected text
    const [comment, setComment] = useState(''); // Holds the current input comment
    const [iconPosition, setIconPosition] = useState({}); // Position of the comment icon
    const [highlightColor, setHighlightColor] = useState('#ffff00'); // Default highlight color
    const [editIndex, setEditIndex] = useState(null); // Holds index of comment being edited
    const textRef = useRef(null); // To reference the text container for scrolling
    const commentsRef = useRef(null); // To reference the comments container

    // Default color options
    const colorOptions = ['#ffff00', '#ffcccb', '#90ee90', '#add8e6', '#ffb6c1', '#f08080'];

    // Fetch text data from URL
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

        // Retrieve stored comments from localStorage
        const storedComments = JSON.parse(localStorage.getItem('comments'));
        if (storedComments) {
            setComments(storedComments);
        }
    }, [textUrl]);

    // Handle text selection
    const handleTextSelection = () => {
        const selection = window.getSelection();
        const selected = selection.toString();

        if (selected) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Save selected text
            setSelectedText(selected);

            // Set the icon position
            setIconPosition({
                top: rect.top + window.scrollY - 30, // Adjust position above the selection
                left: rect.left + window.scrollX,
            });

            // Scroll the comments section to the top
            if (commentsRef.current) {
                commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // Add or Edit Comment
    const addOrEditComment = () => {
        if (selectedText && comment) {
            const updatedComments = [...comments];

            if (editIndex !== null) {
                // Edit existing comment
                updatedComments[editIndex] = { ...updatedComments[editIndex], comment, highlightColor };
                setEditIndex(null);
            } else {
                // Add new comment with selected highlight color
                const highlightedHtml = textData.replace(
                    selectedText,
                    `<mark id="highlight-${comments.length}" style="background-color: ${highlightColor}">${selectedText}</mark>`
                );
                setTextData(highlightedHtml);

                const newComment = {
                    text: selectedText,
                    comment,
                    color: highlightColor,
                    position: iconPosition.top, // Save position for scrolling
                    id: `highlight-${comments.length}`, // Unique ID for the highlighted section
                };

                updatedComments.push(newComment);
            }

            setComments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments)); // Persist in localStorage
            setSelectedText('');
            setComment('');
            setHighlightColor('#ffff00'); // Reset highlight color
        }
    };

    console.log({ textData: extractMarkContent(textData), data: textData });

    // Scroll to the text section when the comment is clicked
    const scrollToComment = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Edit Comment
    const handleEditComment = (index) => {
        setEditIndex(index);
        setSelectedText(comments[index].text);
        setComment(comments[index].comment);
        setHighlightColor(comments[index].color);
    };

    // Delete Comment
    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));

        // Reset highlights by removing all <mark> tags and re-highlighting
        let updatedText = textData.replace(/<\/?mark[^>]*>/g, ''); // Remove all mark tags
        updatedComments.forEach((comment, i) => {
            updatedText = updatedText.replace(
                comment.text,
                `<mark id="highlight-${i}" style="background-color: ${comment.color}">${comment.text}</mark>`
            );
        });
        setTextData(updatedText);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Left side: Display text */}
            <div
                style={{ width: '70%', padding: '10px', borderRight: '1px solid #ccc', position: 'relative' }}
                onMouseUp={handleTextSelection}
                ref={textRef}
                dangerouslySetInnerHTML={{ __html: textData }} // Render highlighted text with HTML
            />

            <div className='flex flex-col w-[25%] fixed max-h-[100%] overflow-y-scroll right-0'>
                <div ref={commentsRef}> {/* Reference for the comments section */}
                    {/* Right side: Display comments */}
                    {/* Textarea to add/edit comment */}
                    {selectedText && (
                        <div>
                            <h4>{editIndex !== null ? 'Edit Comment' : 'Add Comment'}</h4>
                            <p style={{ fontStyle: 'italic' }}>{selectedText}</p>

                            {/* Default color options */}
                            <div style={{ marginBottom: '10px' }}>
                                <h5>Choose Highlight Color</h5>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {colorOptions.map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => setHighlightColor(color)}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                backgroundColor: color,
                                                border: highlightColor === color ? '3px solid black' : '1px solid #ccc',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                rows="4"
                                style={{ width: '100%' }}
                            />
                            <button onClick={addOrEditComment}>{editIndex !== null ? 'Update Comment' : 'Add Comment'}</button>
                        </div>
                    )}
                    <div>
                        <h3>Comments</h3>

                        {/* Display list of comments */}
                        <div style={{ marginTop: '20px' }}>
                            {comments.map((item, index) => (
                                <div key={index} style={{ marginBottom: '10px', cursor: 'pointer' }}>
                                    <strong onClick={() => scrollToComment(item.id)}>{item.text}</strong>
                                    <p onClick={() => scrollToComment(item.id)}>{item.comment}</p>

                                    {/* Edit and Delete buttons */}
                                    <button onClick={() => handleEditComment(index)}>Edit</button>
                                    <button onClick={() => handleDeleteComment(index)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSystem;
