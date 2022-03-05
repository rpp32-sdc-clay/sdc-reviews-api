// Creator: k6 Browser Recorder 0.6.2

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  duration: '5m',
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    },
  },
}

export default function main() {
  let response

  group('page_1 - http://localhost:3000/', function () {
    response = http.get('http://localhost:3000/', {
      headers: {
        dnt: '1',
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(0.9)

    response = http.get('http://localhost:3000/reviews/12', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: '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',
        dnt: '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.get('http://localhost:3000/reviews/meta/12', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: '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',
        dnt: '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.3)

    response = http.put('http://localhost:3000/reviews/15/helpful', null, {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: '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',
        dnt: '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(73)
  })
}