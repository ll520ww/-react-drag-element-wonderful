import React, {useState} from "react";

function DragElement(props) {
    const [isDrag, setIsDrag] = useState(false)
    const {
        onDragEnd,
        data = [],
        MoveItem,
        backgroundStyle = {
            display: "flex",
            flexDirection: "column",
            background: "lightgray",
            width: "300px",
            padding: "16px",
        },
        backgroundItemStyle = {
            margin: "10px",
            background: "gray",
            padding: "16px"
        }
    } = props
    const [list, setList] = useState(data)
    const handleAllow = (e) => {
        e = e || event
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    };


    return (
        <div style={backgroundStyle ? backgroundStyle : {}}>
            {
                list.map((item, index) => {
                    return <div
                        style={backgroundItemStyle ? backgroundItemStyle : {}
                        }
                        key={index}
                        draggable={true}
                        onDragStart={(e) => {
                            e.dataTransfer.setData("name", item)
                            e.dataTransfer.setData("startIndex", e.target?.getAttribute("data-index"))
                            setIsDrag(true)
                        }}
                        data-index={index}
                        onDragOver={handleAllow}
                        onDragEnter={handleAllow}
                        onDrop={(e) => {
                            const targetIndex = Number(e.target?.getAttribute("data-index"))
                            const startIndex = Number(e.dataTransfer.getData("startIndex"))
                            const result = Array.from(list)
                            const [remove] = result.splice(startIndex, 1)
                            result.splice(targetIndex, 0, remove)
                            setList(result)
                            setIsDrag(false)
                            onDragEnd(result, startIndex, targetIndex)
                        }}
                    >
                        {MoveItem(item)}
                    </div>
                })
            }
        </div>
    );
}

export default DragElement;
