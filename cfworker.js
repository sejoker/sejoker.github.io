addEventListener('fetch', event => {
    if (/image-resizing/.test(event.request.headers.get("via"))) {
        return fetch(event.request);
    }
    event.respondWith(async function() {
        const url = new URL(event.request.url);
        const size = url.searchParams.get('size');
        const image = url.searchParams.get('image');
        const noPriority = url.searchParams.has('nopri');
        const res = await fetch(`https://jpeg.speedcf.com/${image}`, {
            cf: {
                image: {
                    width: size,
                    height: size,
                    fit: "crop",
                }
            }
        });
        const headers = new Headers(res.headers);
        let pri = headers.get('cf-priority-change');
        if (!pri) {
            pri = JiraCACHE6059Workaround[`${image}-${size}`];
        }
        headers.set('cf-speed-demo-priority', pri);
        if (noPriority) {
            headers.delete('cf-priority-change');
        }
        return new Response(res.body, {
            status: res.status,
            headers,
        })
    }());
})

const JiraCACHE6059Workaround = {
    "cat/1.jpg-300": "0;50/0, 177;30/0, 1767;20/1, 9019;10/1",
    "cat/2.jpg-300": "0;50/0, 177;30/0, 1729;20/1, 10371;10/1",
    "cat/3.jpg-300": "0;50/0, 177;30/0, 1877;20/1, 9376;10/1",
    "cat/4.jpg-300": "0;50/0, 177;30/0, 1742;20/1, 10217;10/1",
    "cat/5.jpg-300": "0;50/0, 177;30/0, 1854;20/1, 20621;10/1",
    "cat/6.jpg-300": "0;50/0, 177;30/0, 1861;20/1, 11304;10/1",
    "cat/7.jpg-300": "0;50/0, 177;30/0, 1665;20/1, 7967;10/1",
    "cat/8.jpg-300": "0;50/0, 177;30/0, 1652;20/1, 8206;10/1",
    "cat/9.jpg-300": "0;50/0, 177;30/0, 1913;20/1, 15392;10/1",
    "cat/10.jpg-300": "0;50/0, 177;30/0, 1592;20/1, 10111;10/1",
    "cat/11.jpg-300": "0;50/0, 177;30/0, 1668;20/1, 8952;10/1",
    "cat/12.jpg-300": "0;50/0, 177;30/0, 1654;20/1, 7471;10/1",
    "cat/13.jpg-300": "0;50/0, 177;30/0, 1566;20/1, 8157;10/1",
    "cat/14.jpg-300": "0;50/0, 177;30/0, 1604;20/1, 8403;10/1",
    "cat/15.jpg-300": "0;50/0, 177;30/0, 1612;20/1, 8424;10/1",
    "cat/16.jpg-300": "0;50/0, 177;30/0, 1898;20/1, 12931;10/1",
    "cat/17.jpg-300": "0;50/0, 177;30/0, 1907;20/1, 9902;10/1",
    "cat/18.jpg-300": "0;50/0, 177;30/0, 1827;20/1, 16363;10/1",
    "cat/19.jpg-300": "0;50/0, 177;30/0, 1765;20/1, 8609;10/1",
    "cat/20.jpg-300": "0;50/0, 177;30/0, 1784;20/1, 12686;10/1",
    "cat/21.jpg-300": "0;50/0, 177;30/0, 1612;20/1, 7525;10/1",
    "cat/22.jpg-300": "0;50/0, 177;30/0, 1860;20/1, 9762;10/1",
    "cat/23.jpg-300": "0;50/0, 177;30/0, 1515;20/1, 5990;10/1",
    "cat/24.jpg-300": "0;50/0, 177;30/0, 1772;20/1, 17086;10/1",
    "cat/1.jpg-600": "0;50/0, 177;30/0, 5499;20/1, 24438;10/1",
    "cat/2.jpg-600": "0;50/0, 177;30/0, 5577;20/1, 30880;10/1",
    "cat/3.jpg-600": "0;50/0, 177;30/0, 6055;20/1, 23891;10/1",
    "cat/4.jpg-600": "0;50/0, 177;30/0, 5542;20/1, 26332;10/1",
    "cat/5.jpg-600": "0;50/0, 177;30/0, 6529;20/1, 65828;10/n",
    "cat/6.jpg-600": "0;50/0, 177;30/0, 6191;20/1, 34410;10/1",
    "cat/7.jpg-600": "0;50/0, 177;30/0, 5177;20/1, 21824;10/1",
    "cat/8.jpg-600": "0;50/0, 177;30/0, 4994;20/1, 24027;10/1",
    "cat/9.jpg-600": "0;50/0, 177;30/0, 6520;20/1, 41568;10/1",
    "cat/10.jpg-600": "0;50/0, 177;30/0, 5150;20/1, 33143;10/1",
    "cat/11.jpg-600": "0;50/0, 177;30/0, 5264;20/1, 25725;10/1",
    "cat/12.jpg-600": "0;50/0, 177;30/0, 5208;20/1, 19053;10/1",
    "cat/13.jpg-600": "0;50/0, 177;30/0, 4850;20/1, 22413;10/1",
    "cat/14.jpg-600": "0;50/0, 177;30/0, 5025;20/1, 23671;10/1",
    "cat/15.jpg-600": "0;50/0, 177;30/0, 4961;20/1, 26079;10/1",
    "cat/16.jpg-600": "0;50/0, 177;30/0, 6237;20/1, 37957;10/1",
    "cat/17.jpg-600": "0;50/0, 177;30/0, 6149;20/1, 27363;10/1",
    "cat/18.jpg-600": "0;50/0, 177;30/0, 6064;20/1, 61151;10/n",
    "cat/19.jpg-600": "0;50/0, 177;30/0, 5633;20/1, 24940;10/1",
    "cat/20.jpg-600": "0;50/0, 177;30/0, 6035;20/1, 36671;10/1",
    "cat/21.jpg-600": "0;50/0, 177;30/0, 4864;20/1, 22487;10/1",
    "cat/22.jpg-600": "0;50/0, 177;30/0, 5938;20/1, 27772;10/1",
    "cat/23.jpg-600": "0;50/0, 177;30/0, 4429;20/1, 15481;10/1",
    "cat/24.jpg-600": "0;50/0, 177;30/0, 5954;20/1, 57420;10/1",
};
