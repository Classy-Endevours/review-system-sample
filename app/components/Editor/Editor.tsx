/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/Editor.js
// @ts-nocheck

import React, { useState, useEffect, useRef, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Markdown } from "tiptap-markdown";

// Import an icon for the button (you can use any icon library)

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Markdown.configure({
        html: false,
      }),
    ],
    content: `
NALS Apartment Homes is pleased to present our first quarter 2022 financial report and distributions. Operating distributions for the first quarter were $24.9 million, or 3.8% of the limited investment, **an increase of 42% vs. the first quarter of 2021**, with all 46 properties earning a distribution. Our same store **collected rents grew by 17.1%** vs. first quarter of 2021.
&nbsp;  

&nbsp;  
Our forward indicators remain extraordinarily favorable. **Our market rents are 20.7% higher** than first quarter of 2021. Our loss-to-lease (current market rents are higher than our scheduled rents) at the end of March was 7.5%, which has been trending down from the 12.7% we reported in our second quarter 2021 report as we continue to realize these higher market rents. Short of an economic slowdown, we anticipate our 2022 revenue growth will be record setting, exceeding Witten Advisor’s 2022 forecast of 13.1% for the U.S. and will likely result in even stronger revenue growth in 2023 as the current loss-to-lease rolls through our scheduled rents.
&nbsp;  

&nbsp;    
MULTIFAMILY MARKET
&nbsp;  

&nbsp;    
The long-term housing supply and demand fundamentals remain favorable, which continues to support the above inflation rent growth (average 3.0% annually) we have experienced over the past 11 years. Total annualized U.S. housing starts (single-family and multifamily) stand at 1.6 million. While total starts remain below historical peaks, construction activity has been steadily rising across most of our markets, and in some cases exceeding their historical peaks. Employment growth, which is often a proxy for apartment demand, has remained strong with the U.S. averaging 1.6 million new jobs added quarterly over the trailing twelve months ending March 2022 (just under 6.5 million annually). Many of our markets are already above their pre-pandemic employment levels. This has brought current employment levels to 99% of their pre-pandemic peak.
&nbsp;  

&nbsp;    
At a macroeconomic level, the U.S. continues to add robust employment while supply of new housing has struggled to keep pace and support new household formations as evidenced by the net apartment absorption (pace at which new apartment deliveries are leased or leased up) which hit a 30-year high while national apartment occupancy levels remained at historically high levels (+97%). As we have mentioned in prior reports, while the shortage in available housing to meet rapidly rising demand has led to record revenue increases for our portfolio, we remain concerned as to what impact these rapidly rising rents are having on affordability throughout the rental market. Until recently, the market rent increases we were seeing across our portfolio were generally in line with the increases we experience in our employee wages (which we view as a reasonable proxy of our residents). Since 2018, our property-level wages have increased 24% while during the same period our average market rents have increased 36.5%, most of which occurred in 2021. These rapid increases in market rents, and consequently the widening of rent-to-income ratios, has (for the first time in our operating history) resulted in our average employee being unable to meet the income qualifications (income 3x monthly rent) for our average priced apartment, despite having raised our lowest hourly base rate from $14.39 to $18.10 (+23%) over the same period. We anticipate these affordability concerns will only be more exacerbated by continued inflation.
&nbsp;  

&nbsp;    
Reported inflation (CPI) in March was up from 7.9% to 8.5% as reported by the U.S. Bureau of Labor Statistics (BLS). As mentioned in our prior reports, the BLS measurement for CPI (Consumer Price Index) attributes approximately 33% of the household expenses to shelter, which on a trailing 12-month basis is reported to have only increased by 5.0% (vs. 3.8% as of November). By comparison, our market rents have increased 20.7% over the same period, and the reported national asking rents are up 14.8% according to Yardi Matrix’s National Multifamily Report.
&nbsp;  

&nbsp;  
As anticipated, typically periods of rapidly rising rents and expenses (i.e., inflation) lead to increases in interest rates in order to combat inflation pressures. While the consensus forecast among many of the top financial institutions suggest inflation has peaked and will settle somewhere around 4.0% at the end of 2022, our forward indicators combined with rapidly increasing labor and material costs, suggest to us the consensus forecast is underestimating inflation. Should this prove to be the case nationally, we would anticipate further increases in interest rates well beyond what the Federal Reserve has recently implemented and announced, which could result in some level of economic slowdown.
&nbsp;  

&nbsp;  
Recent moves in interest rates have led to the 10-year U.S. treasury bond rate (the index used for our borrowing) increasing above 2.8% while agency lender spreads have continued to widen. This has resulted in an all-in fixed rate borrowing rate closer to 4.5-5.0%, compared to the 2.51% average interest rate on our eight refinances in 2021. Despite these recent interest rate hikes and tightening lender spreads, interest in acquiring multifamily assets remains extremely elevated and there is no evidence yet that current pricing has reflected the changes in interest rates. Multifamily sales continue to hit historically low cap rates (i.e. sub 3.25%) in markets in which we own and operate apartments. Most of the aggressive buying has been driven by relatively unknown buyers using high leverage (75-80% LTV), short-term (i.e. 3 years), floating rate financing provided by debt funds. These debt funds are financing between 35-50% of the overall multifamily acquisition volume (which itself is at historically high levels), compared with the more conservative agency financing (i.e. Fannie Mae). Should interest rates continue to rise, as we suspect they will, we anticipate these aggressive floating rate loans will become increasingly problematic and potentially limited in their ability to refinance. Additionally, while the empirical evidence on recently closed transactions has yet to reflect a fundamental change in the market, recent conversations with brokers suggest there are fewer buyers bidding on listings while at the same time we are seeing a significant uptick in the volume of listings. This imbalance between seller expectations and buyer enthusiasm could be the beginning signs of a change in the market which we are hopeful will create buying opportunities later in 2022 and beyond.
&nbsp;  

&nbsp;  
We are proud to report for the past 30 years we have successfully delivered investor K-1’s by the first week of March. For those investors who have elected to receive funds electronically via ACH, we are pleased to be able to send your first quarter distributions by April 15th. For investors who have not switched to ACH deposit yet, your checks will be mailed to you.
&nbsp;  

&nbsp;  
We are grateful for your continued partnership. Should you have any questions, please do not hesitate to contact us.

    `,
    editable: false,
  });

  const [selectedRange, setSelectedRange] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentPosition, setCommentPosition] = useState({ top: 0 });
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const commentBoxRef = useRef(null);
  const lastTap = useRef(0);

  useEffect(() => {
    console.log("Editor initialized");
  }, []);

  const getLineRange = useCallback(
    (pos) => {
      const { view } = editor;
      const lineHeight =
        parseInt(window.getComputedStyle(view.dom).lineHeight, 10) ||
        parseInt(window.getComputedStyle(view.dom).fontSize, 10) ||
        16;

      // Get the coordinates at the clicked position
      const coords = view.coordsAtPos(pos);
      const targetY = coords.top;

      // Find the start position of the line
      let startPos = pos;
      while (startPos > 0) {
        const newCoords = view.coordsAtPos(startPos);
        if (Math.abs(newCoords.top - targetY) > lineHeight / 2) {
          break;
        }
        startPos--;
      }
      startPos++;

      // Find the end position of the line
      let endPos = pos;
      const docSize = editor.state.doc.content.size;
      while (endPos < docSize) {
        const newCoords = view.coordsAtPos(endPos);
        if (Math.abs(newCoords.top - targetY) > lineHeight / 2) {
          break;
        }
        endPos++;
      }
      endPos--;

      return { from: startPos, to: endPos };
    },
    [editor]
  );

  const handleDoubleClick = useCallback(
    (event) => {
      console.log("Double click detected");
      const { clientX, clientY } = event;
      const pos = editor.view.posAtCoords({ left: clientX, top: clientY })?.pos;

      if (pos === null || pos === undefined) return;

      const range = getLineRange(pos);

      setSelectedRange(range);
      setShowCommentBox(true);

      editor.chain().focus().setTextSelection(range).run();

      const coords = editor.view.coordsAtPos(range.to);
      setCommentPosition({ top: coords.bottom + window.scrollY });

      // Hide any displayed comment
      setActiveComment(null);
    },
    [editor, getLineRange]
  );

  const handleTouchEnd = useCallback(
    (event) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap.current;
      if (tapLength < 500 && tapLength > 0) {
        handleDoubleClick(event.changedTouches[0]);
        event.preventDefault();
      }
      lastTap.current = currentTime;
    },
    [handleDoubleClick]
  );

  const handleSubmitComment = useCallback(() => {
    console.log("Comment submitted:", commentText);
    if (commentText.trim() && selectedRange) {
      setComments((prevComments) => [
        ...prevComments,
        { range: selectedRange, text: commentText },
      ]);
      editor
        .chain()
        .focus()
        .setTextSelection(selectedRange)
        .setHighlight()
        .run();
    }
    setShowCommentBox(false);
    setCommentText("");
  }, [commentText, editor, selectedRange]);

  const handleSaveComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment, index) =>
        index === updatedComment.index ? updatedComment : comment
      )
    );
    setActiveComment(null);

    // Update the highlight in the editor
    editor.chain().focus().setTextSelection(updatedComment.range).run();
  };

  const handleDeleteComment = (commentIndex) => {
    const commentToDelete = comments[commentIndex];

    // Remove the comment from the state
    setComments((prevComments) =>
      prevComments.filter((_, index) => index !== commentIndex)
    );
    setActiveComment(null);

    // Remove the highlight from the editor
    editor
      .chain()
      .focus()
      .setTextSelection(commentToDelete.range)
      .unsetHighlight()
      .run();
  };

  useEffect(() => {
    if (editor) {
      const dom = editor.view.dom;

      dom.addEventListener("dblclick", handleDoubleClick);
      dom.addEventListener("touchend", handleTouchEnd);

      const handleSelectionChange = () => {
        const { state } = editor;
        const { from, to } = state.selection;

        if (from !== to) {
          // Text is selected
          const coords = editor.view.coordsAtPos(to);
          setCommentPosition({ top: coords.bottom + window.scrollY });

          setSelectedRange({ from, to });
          setShowCommentBox(true);

          // Hide any displayed comment
          setActiveComment(null);
        }
      };

      editor.on("selectionUpdate", handleSelectionChange);

      const handleClick = (event) => {
        const { clientX, clientY } = event;
        const pos = editor.view.posAtCoords({
          left: clientX,
          top: clientY,
        })?.pos;

        if (pos !== null && pos !== undefined) {
          const marks = editor.state.doc.resolve(pos).marks();

          // Check if the position has a highlight mark
          const hasHighlight = marks.some(
            (mark) => mark.type.name === "highlight"
          );

          if (hasHighlight) {
            // Find the comment associated with this position
            const commentIndex = comments.findIndex(
              (comment) => pos >= comment.range.from && pos <= comment.range.to
            );

            if (commentIndex !== -1) {
              // Set the active comment
              setActiveComment({
                ...comments[commentIndex],
                index: commentIndex,
              });
            }
          } else {
            // Hide the comment modal if clicked elsewhere
            setActiveComment(null);
          }
        }
      };

      dom.addEventListener("click", handleClick);

      return () => {
        dom.removeEventListener("dblclick", handleDoubleClick);
        dom.removeEventListener("touchend", handleTouchEnd);
        dom.removeEventListener("click", handleClick);
        editor.off("selectionUpdate", handleSelectionChange);
      };
    }
  }, [editor, handleDoubleClick, handleTouchEnd, comments]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        commentBoxRef.current &&
        !commentBoxRef.current.contains(event.target) &&
        showCommentBox
      ) {
        handleSubmitComment();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [commentBoxRef, showCommentBox, handleSubmitComment]);

  return (
    <div className="relative bg-gray-100 ">
      {/* Content Container */}
      <div className="flex justify-center py-20">
        <div className="w-full max-w-3xl bg-white">
          {/* Header */}
          <div className="p-4">
            <h1 className="text-center text-2xl font-bold">
              FIRST QUARTER UPDATE
            </h1>
            <div className="mt-2 border-b-4 border-green-300"></div>
          </div>

          {/* Editor Content */}
          <div className="p-4">
            <EditorContent
              editor={editor}
              className="text-justify xs:text-justify sm:text-justify md:text-justify lg:text-justify xl:text-justify"
            />
          </div>
        </div>
      </div>

      {/* Comment Box */}
      {/* Adjusted the positioning of the comment box */}
      {showCommentBox && (
        <div
          ref={commentBoxRef}
          className="absolute bg-white border p-2 rounded shadow-md transition-transform duration-300 transform -translate-x-1/2"
          style={{ top: commentPosition.top, left: "50%" }}
        >
          <textarea
            className="w-96 h-16 border p-2 resize-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded shadow-lg w-2/3 h-3/4 overflow-auto relative">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            <ul>
              {comments.map((comment, index) => {
                const textSnippet = editor.state.doc.textBetween(
                  comment.range.from,
                  comment.range.to,
                  "\n"
                );
                return (
                  <li key={index} className="border-b py-2">
                    <p className="text-sm text-gray-600 mb-1">{textSnippet}</p>
                    <p>{comment.text}</p>
                  </li>
                );
              })}
            </ul>
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowComments(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Active Comment Modal */}
      {activeComment && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-lg w-96 relative">
            <h2 className="text-lg font-bold mb-2">Edit Comment</h2>
            <textarea
              className="w-full h-24 border p-2 resize-none"
              value={activeComment.text}
              onChange={(e) =>
                setActiveComment({ ...activeComment, text: e.target.value })
              }
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteComment(activeComment.index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                </svg>

              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleSaveComment(activeComment)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                </svg>

              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setActiveComment(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Show Comments Button */}
      <div className="fixed bottom-24 right-8 z-10">
        <button
          onClick={() => setShowComments(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v9l-4-4H7a2 2 0 01-2-2V8a2 2 0 012-2h2m8-2H7a2 2 0 00-2 2v5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Editor;
