# prawo jazdy

This repository contais only 4 media files to serve as an example. The whole media package is over 3gb heavy. If you want to get all the files follow the instruction. 

SETTING UP

1. Clone the repository.

2. Go to https://www.gov.pl/web/infrastruktura/prawo-jazdy and download the xls file and all the media files packages.

3. Edit xls file: in the top row remove all spaces and replace polish letters with latin ones (ź -> z, ą -> a etc.).

3. Convert xls into json (for instructions see: https://stackoverflow.com/questions/8238407/how-to-parse-excel-xls-file-in-javascript-html5) and replace the "baza_pytan.json" file.

4. Convert .wmv files into .mp4

5. Place all the videos and images into "media" folder.

6. If you want to run the app locally, you need to start a local server - otherwise it will not run in your browser due to CORS.

