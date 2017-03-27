(function () {
    angular
        .module("FlightSearchApp")
        .controller("AgentNotificationController", AgentNotificationController);

    function AgentNotificationController($location, $routeParams, MessageService) {
        var vm = this;

        vm.filterAlerts = filterAlerts;
        vm.clearFilterAlerts = clearFilterAlerts;

        function init() {
            MessageService
                .findAlerts()
                .then(
                    function (alerts) {
                        vm.alerts = alerts;
                        vm.alertsBackup = angular.copy(vm.alerts);
                    },
                    function (err) {
                        vm.error = "Could not get alerts. Please try again";
                    }
                );
        }
        init();

        function clearFilterAlerts() {
            vm.alerts = vm.alertsBackup;
        }

        function filterAlerts(alertFilter) {
            vm.alerts = angular.copy(vm.alertsBackup);
            var showAlerts = [];
            // alertFilter.dates.includes(a.departDate) ||
            // alertFilter.dates.includes(a.returnDate)
            for (singleAlert in vm.alerts.data) {
                var a = vm.alerts.data[singleAlert];
                if (alertFilter.dates) {
                    if (a.source === alertFilter.source ||
                        a.destination === alertFilter.destination ||
                        a.userid === alertFilter.username ||
                        a.departDate.indexOf(alertFilter.dates) !== -1 ||
                        a.returnDate.indexOf(alertFilter.dates) !== -1
                    ) {
                        showAlerts.push(a);
                    } else {
                    }
                } else {
                    if (a.source === alertFilter.source ||
                        a.destination === alertFilter.destination ||
                        a.userid === alertFilter.username
                    ) {
                        showAlerts.push(a);
                    } else {
                    }

                }

            }
            console.log(showAlerts);
            vm.alerts.data = showAlerts;
        }


    }
})();