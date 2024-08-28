import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseManagement.css';
import Nave from './Nave';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const [lessonToUpdate, setLessonToUpdate] = useState(null);
  const [newLesson, setNewLesson] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelection = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/lessons/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && Array.isArray(response.data.lessons)) {
        setLessons(response.data.lessons);
        setSelectedCourse(courseId);
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleUpdateCourse = async (courseId, updatedCourseData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/courses/${courseId}`, updatedCourseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Course updated successfully');
      setCourseToUpdate(null);
      setCourses(courses.map(course => course.course_id === courseId ? { ...course, ...updatedCourseData } : course));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Course deleted successfully');
      setCourses(courses.filter(course => course.course_id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdateLesson = async (lessonId, updatedLessonData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/lessons/${lessonId}`, updatedLessonData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Lesson updated successfully');
      setLessonToUpdate(null);
      setLessons(lessons.map(lesson => lesson.lesson_id === lessonId ? { ...lesson, ...updatedLessonData } : lesson));
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Lesson deleted successfully');
      setLessons(lessons.filter(lesson => lesson.lesson_id !== lessonId));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      console.error('No course selected.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/lessons',
        { ...newLesson, course_id: selectedCourse }, // Ensure this matches the backend field name
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Response from server:', response.data);
  
      if (response.data && response.data.lesson) {
        setLessons([...lessons, response.data.lesson]);
        setNewLesson({ title: '', content: '' }); // Reset form fields
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };
  
  
  return (
    <div>
      <Nave />
      <div id="course-management-container" className="course-management-container">
      <h3 className='hed0'>Update Course</h3>
        <table id="course-table" className="course-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.course_id}>
                <td>{course.title || 'No Title'}</td>
                <td>{course.instructor_name || 'No Instructor'}</td>
                <td>{course.start_date || 'No Start Date'}</td>
                <td>{course.end_date || 'No End Date'}</td>
                <td>
                  <button className="view-lessons-btn" onClick={() => handleCourseSelection(course.course_id)}>View Lessons</button>
                  <button className="update-course-btn" onClick={() => setCourseToUpdate(course)}>Update</button>
                  <button className="delete-course-btn" onClick={() => handleDeleteCourse(course.course_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courseToUpdate && (
          <div className="update-course-form">
            <h3>Update Course</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCourse(courseToUpdate.course_id, courseToUpdate);
            }}>
              <input
                type="text"
                value={courseToUpdate.title || ''}
                onChange={(e) => setCourseToUpdate({ ...courseToUpdate, title: e.target.value })}
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={courseToUpdate.instructor_name || ''}
                onChange={(e) => setCourseToUpdate({ ...courseToUpdate, instructor_name: e.target.value })}
                placeholder="Instructor"
                required
              />
              <input
                type="date"
                value={courseToUpdate.start_date || ''}
                onChange={(e) => setCourseToUpdate({ ...courseToUpdate, start_date: e.target.value })}
                placeholder="Start Date"
                required
              />
              <input
                type="date"
                value={courseToUpdate.end_date || ''}
                onChange={(e) => setCourseToUpdate({ ...courseToUpdate, end_date: e.target.value })}
                placeholder="End Date"
                required
              />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setCourseToUpdate(null)}>Cancel</button>
            </form>
          </div>
        )}

        {selectedCourse && (
          <div id="selected-course-lessons" className="selected-course-lessons">
            <h2 id="lessons-heading">Lessons for Selected Course</h2>
            <ul id="lessons-list" className="lessons-list">
              {lessons.map(lesson => (
                <li key={lesson.lesson_id}>
                  {lesson.title || 'No Title'}
                  <button className="update-lesson-btn" onClick={() => setLessonToUpdate(lesson)}>Update</button>
                  <button className="delete-lesson-btn" onClick={() => handleDeleteLesson(lesson.lesson_id)}>Delete</button>
                </li>
              ))}
            </ul>

            {lessonToUpdate && (
              <div className="update-lesson-form">
                <h3>Update Lesson</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateLesson(lessonToUpdate.lesson_id, lessonToUpdate);
                }}>
                  <input
                    type="text"
                    value={lessonToUpdate.title || ''}
                    onChange={(e) => setLessonToUpdate({ ...lessonToUpdate, title: e.target.value })}
                    placeholder="Title"
                    required
                  />
                  <textarea
                    value={lessonToUpdate.content || ''}
                    onChange={(e) => setLessonToUpdate({ ...lessonToUpdate, content: e.target.value })}
                    placeholder="Content"
                    required
                  ></textarea>
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={() => setLessonToUpdate(null)}>Cancel</button>
                </form>
              </div>
            )}

            <div className="add-lesson-form">
              <h3>Add New Lesson</h3>
              <form onSubmit={handleAddLesson}>
                <input
                  type="text"
                  value={newLesson.title || ''}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="Lesson Title"
                  required
                />
                <textarea
                  value={newLesson.content || ''}
                  onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                  placeholder="Lesson Content"
                  required
                ></textarea>
                <button type="submit">Add Lesson</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
