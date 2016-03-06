var app = angular.module('controllerApp',['serviceApp']);
app.controller('gridController',function($scope,$mdMedia,resourceFetcherService){
    $scope.items = [];
    $scope.userDisplayedItems = [];
    resourceFetcherService.fetchItems.success(function(data,status,header,config){
      $scope.items = data;
      $scope.userDisplayedItems = $scope.items.map(function(item,index){
          item.quantity = 0;
          return item;
      });
    });
    $scope.incrementQuantity = function(index) {
        $scope.userDisplayedItems[index].quantity++;
        $scope.$emit('changeInCart',{data:$scope.userDisplayedItems[index]});
    }
    $scope.decrementQuantity = function(index) {
        if($scope.userDisplayedItems[index].quantity > 0) {
            $scope.userDisplayedItems[index].quantity--;
            $scope.$emit('changeInCart',{data:$scope.userDisplayedItems[index]});
        }
    }
    $scope.getRowHeight = function() {
        if($mdMedia('gt-sm')) {
            return '3:4';
        }
        return '2:3';
    }
});

app.controller('cartController',function($rootScope,$scope,$mdDialog,$mdSidenav,$log,$mdMedia){
    $scope.items = [];
    $scope.showSideNav = function(componentId) {
      if(!$mdMedia('gt-sm')) {
        $mdSidenav(componentId).toggle().then(function(){
            $log.debug('sideNav opened');
        });
      }
    }
    $rootScope.$on('changeInCart',function(event,itemObj){
        var inCart = false;
        var indexOfItem = 0;
        var deletionRequired = false;
        $scope.items.forEach(function(item,index){
            if(item.id == itemObj.data.id) {
                inCart = true;
                $scope.items[index].quantity = itemObj.data.quantity;
                if($scope.items[index].quantity == 0) {
                    deletionRequired = true;
                    indexOfItem = index;
                }
                return;
            }
        });
        if(!inCart) {
            $scope.items.push(itemObj.data);
        }
        if(deletionRequired) {
           $scope.items.splice(indexOfItem,1);
        }
        $rootScope.items = $scope.items;
    });
    $scope.showDialog = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          template:'<md-dialog class="column" style="width:50%;height:auto;"><md-dialog-header><md-toolbar><div class="md-toolbar-tools"><span>My Cart</span></div></md-toolbar></md-dialog-header><md-dialog-content><md-list><md-list-item ng-repeat="item in items" class="row" style="width:80%;"><span style="width:33%"><span style="width:30%">{{item.name}}</span><span style="width:40%">x</span><span style="width:30%">{{item.quantity}}</span></span> <span style="width:33%"> = </span> <span style="width:33%">Rs.{{item.quantity*item.price.replace("Rs","")}}</span></md-list-item><md-divider md-inset></md-divider><md-list-item style="width:80%"><span style="width:33%;">Total Money</span><span style="width:33%;">=</span><span style="width:33%;">Rs.{{totalPrice}}</span></span></md-list-item></md-list></md-dialog-content><md-dialog-actions><md-button ng-click="hideDialog()">Cancel</md-button><md-button ng-click="hideDialog()">Checkout</md-button></md-dialog-actions></md-dialog>',
          parent:parentEl,
          controller:function($scope,$rootScope,$mdDialog) {
              $scope.items = $rootScope.items;
              $scope.totalPrice = 0;
              $scope.items.forEach(function(item,index){
                  $scope.totalPrice += item.quantity*parseFloat(item.price.replace("Rs",""));
              });
              $scope.hideDialog = function() {
                  $mdDialog.hide();
              };
          },
          local:{items:$scope.items}
        });
    };
});

app.controller('sideNavController',function($scope,$mdSticky,resourceFetcherService){
    $mdSticky($scope,angular.element(document.getElementById('sideNav')));
    $scope.menuLins = [];
    resourceFetcherService.fetchLinks.success(function(data,config,header,status){
        $scope.menuLinks = data;
    });
});
