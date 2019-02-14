import { v4 } from "uuid";

class Cluster {
  constructor(position, ideas = [], id = false, name) {
    this.id = id ? id : v4();
    this.name = name;
    this.position = position;
    this.ideas = ideas.map(idea => {
      return { ...idea, position: position };
    });
  }

  addIdea(idea) {
    this.ideas = [...this.ideas, { ...idea, position: this.position }];
    return this;
  }
}

export default Cluster;
