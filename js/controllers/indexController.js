index.controller('indexController', function($scope) {
    $scope.name = '' ;
    $scope.isShow = false ;
    $scope.status = false ;

    //get localStorage List
    var lists = localStorage.getItem('lists');

    //explain lists
    $scope.lists = lists? angular.fromJson(lists) : [ ];

    //add by enter
    $scope.enter = function(ev) {
        if (ev.keyCode !== 13) {
            return ;
        }

        $scope.addList();
    }

    //add data
    $scope.addList = function() {
            var str = $scope.data;
            if (str) {
                    $scope.lists.push( {id : $scope.lists.length+1, content : $scope.data, time : getTime(), finish : 0 } );
                    $scope.data = '';
                    $scope.upload();
                }

        }

        //show the del-button
        $scope.showDel  = function(list) {
            $scope.choose = list.id;
        }

        //hide the del-button
        $scope.hideDel  = function() {
            $scope.choose = 0;
        }

        //del the data
        $scope.del = function(num) {
            $scope.lists.splice(num, 1);
            $scope.upload();
        }

        //upload the data to list
        $scope.upload = function() {
            localStorage.setItem('lists', angular.toJson($scope.lists) );
        }

        //delete all storage data
        $scope.clear = function() {
            localStorage.clear();
            $scope.lists = [ ] ;
        }

        //get the time
        function getTime() {
            var time = new Date();
            
            return time;
        }

        //get the choose item
        $scope.selectOne = function(num) {
            var record = $scope.lists[num];
            if (record[finish] === 0) {
                record[finish] = 1;
            } else {
                record[finish] = 0;
            }

            $scope.lists.splice(num, 1, record);
            $scope.upload();
        }

});