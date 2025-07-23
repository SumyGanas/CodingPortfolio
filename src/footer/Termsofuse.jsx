import '../styles/App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TermsOfUse() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-*" onClick={handleShow}>Terms of Use</Button>

      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Terms of Use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                < h6>
                Effective Date: Jan 1, 2024
                </h6>
            <p>
                By accessing and using this Site, you agree to the following terms and conditions: 
            </p>
            
            <ol>
                <li>
                  Use of Content
                  <p>
                    All content on this Site, including but not limited to text, images, code snippets, and project descriptions, is the intellectual property of Sumy Ganas, unless otherwise noted. You may view, download, or share publicly available content for personal, non-commercial use only. Any other use requires prior written permission.
                </p>  
                </li>

                <li>
                No Warranties
                  <p>
                  This Site is provided “as is” without any warranties, express or implied. While reasonable efforts are made to ensure the information is accurate and up to date, no guarantees are made regarding completeness, reliability, or suitability.
                </p>  
                </li>

                <li>
                External Links
                  <p>
                  This Site may contain links to third-party websites. These links are provided for convenience only and do not imply endorsement. Sumy Ganas is not responsible for the content or practices of any third-party sites.
                </p>  
                </li>

                <li>
                Limitation of Liability
                  <p>
                  To the maximum extent permitted by law, Sumy Ganas shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use this Site.
                </p>  
                </li>

                <li>
                Changes to These Terms
                  <p>
                  These Terms may be updated periodically. Any changes will be posted on this page with a revised effective date. Continued use of the Site after changes constitutes acceptance of the new Terms.
                </p>  
                </li>     

                <li>
                Contact
                  <p>
                  If you have any questions about these Terms, you may contact me at:
            Email: [aksmy.997@gmail.com]
                </p>  
                </li>               
            </ol>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TermsOfUse;