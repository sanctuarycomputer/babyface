import ContainerBase from "lib/ContainerBase";

class HomeContainer extends ContainerBase {
  view = import("views/HomeView");

  model = () => {
  };
}

export default HomeContainer;
