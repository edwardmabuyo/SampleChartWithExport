angular.module('app', ['chart.js', 'ngJsonExportExcel'])
    .controller('PieCtrl', ['$scope', '$window',
        function ($scope, $window) {
            $scope.labels = [];
            $scope.data = [];
            $scope.options = {
                 onAnimationComplete: function () {
                    this.showTooltip(this.segments, true);
                },
                responsive: true,
                title: {
                    display: true,
                    text: 'How many employees does the company have?'
                },
                legend: {
                    display: true,
                    position: 'bottom',
                }
            }
            $scope.jsonData = [
                    {
                        Department: "HR",
                        NoOfEmployees: 15,
                    },
                    {
                        Department: "IT",
                        NoOfEmployees: 5,
                    },
                    {
                        Department: "Enginering",
                        NoOfEmployees: 70,
                    },
                    {
                        Department: "Maintenance",
                        NoOfEmployees: 10,
                    }
            ];

            function convertDataToChart(data, propertyLabel, propertyValue) {
                $scope.labels = [];
                $scope.data = [];
                data.forEach(function(item, index) {
                    $scope.labels.push(item[propertyLabel] + ' (' + item[propertyValue] + ')');
                    $scope.data.push(item[propertyValue]);
                });
            }

            convertDataToChart($scope.jsonData, 'Department', 'NoOfEmployees');

            $scope.exportToImage = function () {
                var imgUrl = angular.element(document).find('#pie')[0].toDataURL("image/png");
                var anchor = angular.element('<a>')
                    .attr('href', imgUrl)
                    .attr("download", "img.png").appendTo("body")
                anchor[0].click();
                anchor.remove();
            };

            $scope.exportToCSV = function () {

            }

            $scope.$on('chart-crenpmate', function (evt, chart) {
                console.log(chart);
            });


}]);