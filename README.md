## Visual idea Clustering

## Setup:

- `npm install`
- `npm run init`

### Run:

- `npm start` to start both server and client.
- `npm run start:client`
- `npm run start:server`

### Tests:

- `npm test`

### Related Work

- [IdeaHound](http://www.eecs.harvard.edu/~kgajos/papers/2016/siangliulue16ideahound-uist.shtml)

### Requirements

- [x] Anzeige von 5 ideen
- [x] Drag and drop logik
- [x] Dynamische Anzahl von Ideen
- [x] Clustering Logik
- [x] Rename Clusters, onDoubleClick on header. save onEnter
- [ ] Zoomable Map of idea space, how to navigate on the map?
- [x] Export Button off idea Space.
- [x] List of Clusters as DropZone to easily move ideas
- [x] click on cluster list item to focus on that cluster on the map

## Application

- bring ideas in relation, build Clusters, summerize and filter them to generate quality ideas from that.

## Transaction Data with Server

- result.json

```
{
  "ideas": [
   {
     "content": "covering table tennis... ",
     "@id": "http://purl.org/innovonto/ontoideaLegacy/ideas/21f895e3-410e-48a8-820d-546fee15894a",
     "id": "21f895e3-410e-48a8-820d-546fee15894a",
     "position": {
       "left": 91,
       "top": 101
     },
     "labels": [
       "firstLabel"
     ],
     "cluster": "3bf97c68-50e4-4e19-b524-e8c2ab77727c"
   }, ...
 ],
 "clusters": [
   {
     "id": "34414e3a-4aaa-4d9e-9428-f37353559c80",
     "name": "Logistics",
     "position": {
       "left": 208,
       "top": 724
     }
   }, ...
 ]
}
```

## View

![Example](/client/public/ScreenshotVisualIdeaClustering.png)

## Activity Diagram

![Diagram](/client/public/ActivityDiagramClustering.png)

```

```
