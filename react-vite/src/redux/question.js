// action type
const RETURN_INITIAL = "questions/RETURN_INITIAL";
const GET_QUESTIONS = "questions/GET_QUESTIONS";

// action creator
const getProjects = (projects) => {
    return {
      type: GET_PROJECTS,
      projects,
    };
  };
  

const getOneProject = (project) => ({
    type: GET_ONE_PROJECT,
    project,
  });
  