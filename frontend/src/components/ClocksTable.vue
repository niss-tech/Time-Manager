<template>
    <div class="d-flex flex-column justify-content-between w-75 mx-auto my-4 shadow card p-3">
        <h4 class="fw-semibold mt-2 mb-4">My previous clocks</h4>
        <div class="rounded-3 overflow-auto">
            <table class="table table-striped text-center">
            <thead>
                <tr class="table-primary">
                    <th scope="col">
                        <svg class="col-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#1b93b1" stroke-width="2" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#1b93b1"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#1b93b1"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#1b93b1"></rect> </g></svg>
                    </th>
                    <th scope="col-1">
                        <svg class="col-2" viewBox="-2 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>timer</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-519.000000, -360.000000)" fill="#1b93b1"> <path d="M533,374.184 L533,369 C533,368.448 532.553,368 532,368 C531.447,368 531,368.448 531,369 L531,374.184 C529.838,374.597 529,375.695 529,377 C529,378.657 530.343,380 532,380 C533.657,380 535,378.657 535,377 C535,375.695 534.162,374.597 533,374.184 L533,374.184 Z M532,388 C525.925,388 521,383.075 521,377 C521,370.925 525.925,366 532,366 C538.075,366 543,370.925 543,377 C543,383.075 538.075,388 532,388 L532,388 Z M532.99,364.05 C532.991,364.032 533,364.018 533,364 L533,362 L537,362 C537.553,362 538,361.553 538,361 C538,360.447 537.553,360 537,360 L527,360 C526.447,360 526,360.447 526,361 C526,361.553 526.447,362 527,362 L531,362 L531,364 C531,364.018 531.009,364.032 531.01,364.05 C524.295,364.558 519,370.154 519,377 C519,384.18 524.82,390 532,390 C539.18,390 545,384.18 545,377 C545,370.154 539.705,364.558 532.99,364.05 L532.99,364.05 Z" id="timer" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                    </th>
                    <th scope="col">
                        <svg class="col-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Exit"> <path id="Vector" d="M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75" stroke="#1b93b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                    </th>
                    <th scope="col">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H3V8C3 6.89543 3.89543 6 5 6H9M4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M4 12H10M20 12H21V8C21 6.89543 20.1046 6 19 6H15M20 12H14M14 12V10H10V12M14 12V14H10V12M9 6V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6M9 6H15" stroke="#1b93b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </th>                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">15/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
                <tr>
                    <td scope="row">14/10/2025</td>
                    <td class="text-danger">09:42</td>
                    <td class="text-success">17:30</td>
                    <td class="text-danger">07:48</td>
                </tr>
                <tr>
                    <td scope="row">13/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
                <tr>
                    <td scope="row">12/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
                <tr>
                    <td scope="row">09/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
                <tr>
                    <td scope="row">08/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
                <tr>
                    <td scope="row">07/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
                <tr>
                    <td scope="row">06/10/2025</td>
                    <td>09:24</td>
                    <td>17:33</td>
                    <td>08:09</td>
                </tr>
            </tbody>
        </table>
        </div>
        
    </div>
</template>