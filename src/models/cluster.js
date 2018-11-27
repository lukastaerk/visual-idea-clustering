var counter = 1;

class Cluster {
  constructor(position, ideas = [], id = false, name) {
    this.id = id ? id : counter++;
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
