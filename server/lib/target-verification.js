const { Resolver } = require('dns').promises;
const { URL } = require('url');
const fetch = require('node-fetch');

const resolver = new Resolver();

function getHost (target) {
  const url = new URL(target.endpoint);
  return `${url.protocol}//${url.hostname}`;
}

function verifyTxt (records, verification) {
  return records.find((r) => r.trim() === verification);
}

function verifyDNSTXT (target) {
  const hostname = getHost(target);
  const expectedVerification = `timetrigger-verify=${target.verificationCode}`;

  console.log('DNS Verify for', hostname);
  return resolver.resolveTxt(hostname)
    .then((records) => {
      return verifyTxt(records, expectedVerification);
    }).catch((e) => {
      console.log('No TXT records found');
      return false;
    });
}

function verifyStaticFile (target) {
  const hostname = getHost(target);
  console.log('hostname', hostname);
  return fetch(`${hostname}/timetrigger-verify.txt`, {
    headers: {
      'content-type': 'plain/text'
    }
  }).then((res) => {
    if (res.ok) {
      return res.text();
    }
  }).then((data) => {
    if (!data) {
      throw new Error('No verification file found on host');
    }

    const expectedVerification = `timetrigger-verify=${target.verificationCode}`;

    if (data.trim() === expectedVerification) {
      return true;
    }

    return false;
  });
}

module.exports = function verifyTarget (target) {
  switch (target.verificationMethod) {
    case 'dns_txt':
      return verifyDNSTXT(target);
    case 'static_file':
      return verifyStaticFile(target);
    default:
      return Promise.reject(new Error('Unknown verification method'));
  }
};
