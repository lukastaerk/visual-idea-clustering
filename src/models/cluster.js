var counter = 0;

class Cluster {
  constructor(position, ideas = [], height = 120, width = 120, id = false) {
    this.id = id ? id : counter + 1;
    this.position = position;
    this.height = height;
    this.width = width;
    this.ideas = ideas;
  }

  addIdea(idea) {
    this.ideas.push(idea);
  }
}

export default Cluster;
