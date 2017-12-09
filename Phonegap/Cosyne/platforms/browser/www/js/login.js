var app = angular.module('cosyne', ['ui.router']);
app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
});
app.controller('loginCtrl', loginCtrl);
function loginCtrl($scope, $location) {
  var vm = this;

  vm.username = '';
  vm.poop = 'shit';
  vm.testVar = '';
  console.log("LOADED");
  vm.test = function(){
    console.log("WORKING");
    vm.testVar = "POOPER";
    console.log(vm.username);
  };

  vm.submit = function(){
    console.log(vm.email);
    console.log(vm.password);
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'email': vm.email, 'password': vm.password})
    }).then((response) => {
      if (!response.ok){
        console.log(response.json());
      }
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson['token']){
        console.log(responseJson['token']);
        console.log($location.path());
        $location.path(`test.html`);
        console.log("WINDOW HREF");
      }
    }).catch((err)=> {
      console.error(err);
      alert("FUCK");
    });
  };
}

app.controller('registerCtrl', registerCtrl);
function loginCtrl($scope, $location) {
  var vm = this;

  vm.username = '';
  vm.poop = 'shit';
  vm.testVar = '';
  console.log("LOADED");
  vm.test = function(){
    console.log("WORKING");
    vm.testVar = "POOPER";
    console.log(vm.username);
  };

  vm.submit = function(){
    console.log(vm.email);
    console.log(vm.password);
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'email': vm.email, 'password': vm.password})
    }).then((response) => {
      if (!response.ok){
        console.log(response.json());
      }
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson['token']){
        console.log(responseJson['token']);
        console.log($location.path());
        $location.path(`test.html`);
        console.log("WINDOW HREF");
      }
    }).catch((err)=> {
      console.error(err);
      alert("FUCK");
    });
  };
}
