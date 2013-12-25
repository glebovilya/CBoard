/**
 * Created by stepanjuk on 25.12.13.
 */
define(
    ['text!./templates/addRemoveDate.html',
    'text!./templates/addProject.html',
    'text!./templates/addEmployee.html',
    'text!./templates/accordionHead.html',
    'text!./templates/accordionItem.html',
    'text!./templates/wrapItems.html',
    'text!./templates/finishProject.html',
    'text!./templates/employe.html',
    'text!./templates/project.html'
    ], function (
        templateAddRemoveDate,
        templateAddProject,
        templateAddPersone,
        accordHead,
        accordItem,
        accordWrapItem,
        templateFinishProject,
        templateEmployee,
        templateProject
        ) {

    var templates = {
        templateAddRemoveDate: templateAddRemoveDate,
        templateAddProject: templateAddProject,
        templateAddPersone: templateAddPersone,
        accordHead: accordHead,
        accordItem: accordItem,
        accordWrapItem: accordWrapItem,
        templateFinishProject: templateFinishProject,
        templateEmployee: templateEmployee,
        templateProject: templateProject
    }
        return templates;
});