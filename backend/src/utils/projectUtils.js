`use strict`

import Projects from '../models/mongoDB/projects'

exports.findProject = async (projectId) => {
    var result = await Projects.findById(projectId)
    return result;
}