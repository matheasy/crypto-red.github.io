import ReactDOMServer from 'react-dom/server'
import QRCode from "qrcode.react";
import React from "react";
import svg64 from "svg64";
import jdenticon from "jdenticon";

function download_qr_code_image(text_string, size_px = 512, level="M", name = "name", account_name="account_name") {

    const jdenticon_string_base64 = svg64(jdenticon.toSvg(account_name, size_px/12));

    const svg_string = ReactDOMServer.renderToString(<QRCode
        level={level}
        size={size_px}
        bgColor={"#ffffff"}
        fgColor={"#0f0955"}
        renderAs={"svg"}
        value={text_string}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        imageSettings={{
            src: jdenticon_string_base64,
            x: null,
            y: null,
            height: size_px/12,
            width: size_px/12,
            excavate: true,
        }}
    />);

    const svg_string_base64 = svg64(svg_string);

    const margin = 48;
    const padding = 16;

    let my_window = window.open("", name, `top=${margin},left=${margin},scrollbars=no,resizable=no,`);


    const html_image =`<img style="position: relative; border: ${margin/8}px solid #3c32f3;border-radius: ${margin/12}px ${margin/12}px 0px 0px;margin:${margin}px;padding:${padding}px;display:block;margin-left:auto;margin-right:auto;width:${size_px}px;height:${size_px};" src="${svg_string_base64}"></img>`;
    const html_string =
        `<html>
            <head>
                <style>
                      body {-webkit-print-color-adjust: exact;}
                        @media print {
                          body {-webkit-print-color-adjust: exact;}
                        }
                        @page {
                            size:A4 portrait;
                            margin-left: 0px;
                            margin-right: 0px;
                            margin-top: 0px;
                            margin-bottom: 0px;
                            margin: 0;
                            -webkit-print-color-adjust: exact;
                        }
                </style>
            </head>
            <body style="margin: ${margin}; text-align: center" onload="window.print();setTimeout(function(){window.close();}, 10000)">
                <h1 style="font-family: Arial;text-align: center">${name}</h1>
                <div>
                    ${html_image}
                    <span style="position: absolute; transform: translate(-50%, -${margin+margin/8}px); width: ${size_px+margin/8+margin/8}px; padding:${padding}px; color: #fff; background-color: #3c32f3; border-radius: 0px 0px ${margin/12}px ${margin/12}px;font-family: Arial;">
                        https://wallet.crypto.red/
                    </span>
                </div>
                <svg style="width: calc(100% - ${margin*2}px); margin: auto;"  id="ff41f38c-6ef4-4d72-b305-d437d63a9edd" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="819.07045" height="584" viewBox="0 0 819.07045 584"><path d="M938.36645,683.35934c7.18382,12.69813,1.0921,55.58546,1.0921,55.58546s-39.89068-16.88557-47.07316-29.57842a26.41318,26.41318,0,0,1,45.98106-26.007Z" transform="translate(-190.46477 -158)" fill="#f1f1f1"/><path d="M940.037,738.8895l-.84744.17853c-8.16221-38.77834-36.66552-65.075-36.95246-65.33607l.58274-.64064C903.1088,673.35408,931.81545,699.82958,940.037,738.8895Z" transform="translate(-190.46477 -158)" fill="#fff"/><path d="M1003.63788,697.81816c-9.74789,17.68309-64.70648,41.63828-64.70648,41.63828s-9.06086-59.2631.68177-76.94077a36.55622,36.55622,0,1,1,64.02471,35.30249Z" transform="translate(-190.46477 -158)" fill="#f1f1f1"/><path d="M939.41646,740.09789l-.82555-.869c39.76932-37.7685,50.06448-90.44509,50.16385-90.97274l1.17793.2216C989.83286,649.009,979.47454,702.05508,939.41646,740.09789Z" transform="translate(-190.46477 -158)" fill="#fff"/><path d="M383.03037,563.91909a75.18955,75.18955,0,0,1-18.63955-2.41115l-1.19992-.332-1.11309-.55768c-40.242-20.17656-74.192-46.827-100.90712-79.21137a299.86458,299.86458,0,0,1-50.94916-90.47014,348.20978,348.20978,0,0,1-19.69086-122.66453c.017-.87611.03139-1.55256.03139-2.01861,0-20.28912,11.262-38.0913,28.69121-45.35357,13.33947-5.55813,134.45539-55.30526,143.20632-58.89963,16.48038-8.25772,34.062-1.36535,36.87554-.16006,6.31094,2.58025,118.2752,48.375,142.47062,59.89621,24.93578,11.87415,31.5889,33.20566,31.5889,43.93787,0,48.58822-8.415,93.99778-25.01129,134.9674a312.51684,312.51684,0,0,1-56.16213,90.51087c-45.84677,51.59381-91.7057,69.8841-92.14828,70.0453A50.11,50.11,0,0,1,383.03037,563.91909Zm-10.78453-26.71374c3.97586.89138,13.12949,2.22845,19.0957.052,7.57929-2.76408,45.96243-22.668,81.83036-63.03189,49.55709-55.769,74.70242-125.87542,74.73919-208.37177-.08852-1.67134-1.27542-13.59188-17.06153-21.10867C507.12331,233.44669,390.746,185.86014,389.5732,185.38052l-.32154-.13631c-2.43886-1.022-10.20055-3.1747-15.55082-.371l-1.07124.49943c-1.2972.53279-129.86317,53.33754-143.57481,59.05064-9.59168,3.99651-13.00917,13.89729-13.00917,21.83037,0,.57973-.015,1.423-.03619,2.51294C214.91358,325.21375,227.97577,464.11262,372.24584,537.20535Z" transform="translate(-190.46477 -158)" fill="#3f3d56"/><path d="M367.78865,173.58611S238.05415,226.86992,224.154,232.66164s-20.85019,19.69184-20.85019,33.592S192.87875,461.53177,367.78865,549.22768c0,0,15.87478,4.39241,27.91882,0s164.9454-78.52642,164.9454-283.55325c0,0,0-20.85018-24.32522-32.43362s-141.93358-59.6547-141.93358-59.6547S379.95125,167.21522,367.78865,173.58611Z" transform="translate(-190.46477 -158)" fill="#0f0955"/><path d="M381.68877,215.28648V499.53673S250.79593,436.53013,251.95428,270.887Z" transform="translate(-190.46477 -158)" opacity="0.1"/><polygon points="192.931 261.581 151.235 207.969 175.483 189.11 195.226 214.494 261.921 144.088 284.224 165.219 192.931 261.581" fill="#fff"/><path d="M1008.53523,742h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z" transform="translate(-190.46477 -158)" fill="#cacaca"/><polygon points="547.206 568.237 562.671 568.236 570.029 508.583 547.203 508.584 547.206 568.237" fill="#ffb8b8"/><path d="M733.72532,721.18754l30.45762-.00123h.00123a19.411,19.411,0,0,1,19.41,19.40966v.63075l-49.86791.00185Z" transform="translate(-190.46477 -158)" fill="#2f2e41"/><polygon points="599.206 568.237 614.671 568.236 622.029 508.583 599.203 508.584 599.206 568.237" fill="#ffb8b8"/><path d="M785.72532,721.18754l30.45762-.00123h.00123a19.411,19.411,0,0,1,19.41,19.40966v.63075l-49.86791.00185Z" transform="translate(-190.46477 -158)" fill="#2f2e41"/><polygon points="571.514 358.75 575.224 548 545.213 546.139 524.393 425.597 517.817 343.408 571.514 358.75" fill="#2f2e41"/><path d="M813.48315,484.9709,817.68877,709l-35-1-7.56-133.17025-13.15012-48.21688-53.6962-25.20436,8.76674-60.27119,78.90049-1.09584Z" transform="translate(-190.46477 -158)" fill="#2f2e41"/><circle cx="562.67565" cy="99.59389" r="26.83826" fill="#ffb8b8"/><polygon points="584.936 137.738 589.047 143.966 600.006 174.649 591.239 294.095 539.734 295.192 533.16 158.211 546.933 140.995 584.936 137.738" fill="#ccc"/><path d="M702.80325,319.499l-8.76674-1.09584s-2.19169,1.09584-3.2875,8.76671-14.24592,75.613-14.24592,75.613l17.53342,83.28385,19.7251-26.30016-12.05417-46.02526,12.05424-46.0253Z" transform="translate(-190.46477 -158)" fill="#2f2e41"/><polygon points="624.114 160.404 630.689 160.404 647.127 249.166 631.785 318.204 616.443 293 620.826 265.604 618.635 241.496 610.964 227.249 624.114 160.404" fill="#2f2e41"/><path d="M768.99945,257.59388l-4.87969-1.21993s-3.65974-20.73866-12.19924-18.29882-30.498,4.8797-30.498-4.87969,20.73867-18.29882,32.93783-17.0789,27.77947,5.267,31.71794,23.17848c6.31357,28.713-13.02638,35.96549-13.02638,35.96549l.32185-1.04544a16.28235,16.28235,0,0,0-4.37432-16.62119Z" transform="translate(-190.46477 -158)" fill="#2f2e41"/><path d="M695.13238,318.40319l35.06691-14.24592,8.2188-6.02712,24.65642,109.03608,11.5063-112.32365,45.47733,23.56058L804.7164,392.92027l-2.19168,28.49185,6.57505,23.01263s23.0126,16.43761,15.34174,33.971-16.43761,18.6293-16.43761,18.6293-37.25859-35.06688-39.45021-43.83362-5.47918-24.10847-5.47918-24.10847-18.6293,70.13377-40.546,69.0379-21.91679-24.10848-21.91679-24.10848l5.47918-24.10848,8.76674-25.20432-4.38337-41.64192Z" transform="translate(-190.46477 -158)" fill="#2f2e41"/></svg>                
                <h2 style="font-family: Arial;text-align: center">A secure technology...</h2>
            </body>
        </html>`;

    my_window.document.writeln(html_string);
    my_window.document.title = `${name}.pdf`;
    my_window.document.close();

    /*let a = document.createElement("a"); //Create <a>
    a.href = svg_string_base64; //Image Base64 Goes here
    a.download = name.replace(" ", "_") + ".svg"; //File name Here
    a.click();*/
}

module.exports = {
    download_qr_code_image: download_qr_code_image,
};