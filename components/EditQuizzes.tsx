// Import the Supabase client

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

// Initialize the Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );




  export default function EditQuizzes() {
    const [data, setData] = useState(null)
  
    useEffect(() => {
      async function fetchData() {
        let { data, error } = await supabase
          .from('quizzes')
          .select('*')
  
        if (error) console.error('Error: ', error)
        else setData(data)
      }
  
      fetchData()
    }, [])
  
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Week Number</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Incorrect Answer 1</th>
              <th>Incorrect Answer 2</th>
              <th>Incorrect Answer 3</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {data && data.map((row, index) => (
              <tr key={index}>
                <td>{row.week_number}</td>
                <td>{row.day_number}</td>
                <td>{row.question}</td>
                <td>{row.correct_answer}</td>
                <td>{row.incorrect_answer1}</td>
                <td>{row.incorrect_answer2}</td>
                <td>{row.incorrect_answer3}</td>
                <td>
                  <button onClick={() => handleEdit(row)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  function handleEdit(row) {
    // Handle the edit action here
    // You can open a form with the row data for editing
  }