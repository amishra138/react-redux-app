import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropsTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = (course) => {
    toast.success("Course deleted!");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete fails " + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToCoursePage && <Redirect to="/course"></Redirect>}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

//To allow dispatch as in props
CoursesPage.prototypes = {
  courses: PropsTypes.array.isRequired,
  authors: PropsTypes.array.isRequired,
  actions: PropsTypes.object.isRequired,
  loading: PropsTypes.bool.isRequired,
};

//be specific to declare state, as it re-renders component if statge changes
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  //dispatch is an function to notify reducers about action change
  // 1 - by bind action creators
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
