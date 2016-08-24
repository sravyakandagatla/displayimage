var myApp = angular.module('myApp', []);

myApp.controller('checkBoxController', function ($scope) {
    $scope.employees = [{ image: '1', src: "Images/1.jpg", checked: false },
                        { image: '2', src: "Images/2.jpg", checked: false },
                        { image: '3', src: "Images/3.jpg", checked: false },
                        { image: '4', src: "Images/4.jpg", checked: false },
                        { image: '5', src: "Images/5.jpg", checked: false },
                        { image: '6', src: "Images/6.jpg", checked: false },
                        { image: '7', src: "Images/7.jpg", checked: false },
                        { image: '8', src: "Images/8.jpg", checked: false },
                        { image: '9', src: "Images/9.jpg", checked: false },
                        { image: '10',src: "Images/10.jpg",checked: false }];

    $scope.width = 80;
    $scope.height = 100;
    $scope.selection = [];
    $scope.styleClass = 'col-md-4';

    // add the default checked items into the 'selection' collection
    (function init() {
        angular.forEach($scope.employees, function (value, key) {
            if (value['checked'] == true) {
                $scope.selection.push(value['src']);
            }
        });
    })();

    // toggle selection for a given employee by image style="display: {{display}};"
    $scope.toggleSelection = function toggleSelection(employeeSrc) {

        // try to locate the current source element in the selected array
        // if found in the array, then user wants to remove the selected item from display
        // if not found in the array, then user wants to add the selected item to display
        var idx = $scope.selection.indexOf(employeeSrc);
        if (idx >= 0) {

            //
            // user is try to remove a currently displayed image
            //

            // check whether we have more than 1 element selected
            // if not, simplay undo the user action
            if ($scope.selection.length == 1) {
                angular.forEach($scope.employees, function (value, key) {
                    if (employeeSrc == value['src']) {
                        $scope.employees[key]['checked'] = true;
                    }
                });
            }
            else {

                // remove the element from the selected items array
                $scope.selection.splice(idx, 1);
            }
        }
        else {

            //
            // user is trying to add new image to the display
            //

            // checking whether we are within the permitted images count to display
            // if not, simply undo the user action
            if ($scope.selection.length == 6) {
                angular.forEach($scope.employees, function (value, key) {
                    if (employeeSrc == value['src']) {
                        $scope.employees[key]['checked'] = false;
                    }
                });
            }
            else {

                // add the element to the selected items array
                $scope.selection.push(employeeSrc);
            }
        }

        //
        // adjust the display frame co-ordinates
        if ($scope.selection.length == 1) {
            $scope.styleClass = 'col-md-12';
            $scope.height=30;
        } else if ($scope.selection.length == 2 || $scope.selection.length == 4) {
            $scope.styleClass = 'col-md-6';
            $scope.height=60;
        }
        else if ($scope.selection.length == 3 || $scope.selection.length >= 5) {
            $scope.styleClass = 'col-md-4';
            $scope.height = 100;
        }
    }
});
