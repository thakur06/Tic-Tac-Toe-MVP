import React from "react";

import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

function CustomMessageInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active invisible-scrollbar">
      <div className="str-chat__input-flat-wrapper invisible-scrollbar">
        <div className="str-chat__input-flat--textarea-wrapper invisible-scrollbar ">
          <ChatAutoComplete />
        </div>
        <button onClick={handleSubmit}> Send Message</button>
      </div>
    </div>
  );
}

export{ CustomMessageInput};