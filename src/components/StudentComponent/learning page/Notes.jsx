import React, { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { addNotes } from "../../../api/studentApi"
import { useDispatch, useSelector } from "react-redux"
import { selectCourseActions } from "../../../redux/selectedCourseSlice"

const Notes = ({ courseId }) => {
  const notes = useSelector(state => state.selectedCourse.course?.notes)

  const [newNote, setNewNote] = useState("")
  const dispatch = useDispatch()
  const handleAddNote = async () => {
    if (courseId && newNote.trim() !== "") {
      const response = await addNotes({ enrolledId: courseId, notes: newNote })
      if (response) {
        dispatch(selectCourseActions.addNote(newNote))
      }
    }
    setNewNote("")
  }
  useEffect(() => {}, [notes])

  return (
    <div className="container px-6 md:px-0">
      <div>
        <ReactQuill
          value={newNote}
          onChange={value => setNewNote(value)}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"]
            ]
          }}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="p-5 border">
        <h2 className="font-bold text-xl">Notes</h2>
        <ul>
          {notes.map((note, index) => (
            <React.Fragment key={index}>
              <li className="py-2" dangerouslySetInnerHTML={{ __html: note }} />
              <hr />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Notes
