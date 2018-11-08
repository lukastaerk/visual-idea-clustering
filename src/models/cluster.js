var counter = 0;

class Cluster {
  constructor(position, ideas = [], height = 150, width = 300, id = false) {
    this.id = id ? id : counter++;
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
