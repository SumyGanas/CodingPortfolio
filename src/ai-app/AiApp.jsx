import '../styles/App.css';
import React, { useEffect } from 'react';
import HeaderBar from '../nav/HeaderBar.jsx';
import CommonAncestor from './AiComponent.jsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.min.js';
import '../styles/custom-theme.css';
import Image from 'react-bootstrap/Image';
import FooterBar from '../footer/footer.jsx';

const AiAssistant = () => {
  useEffect(() => {
    Prism.highlightAll();
}, []);
const codeSnippet1 = `@https_fn.on_request(
    max_instances=1, cors=options.CorsOptions(cors_origins="*", cors_methods=["get", "post", "options"]), timeout_sec=50, memory=MemoryOption.MB_512
   )
def receive_query(req: https_fn.Request) -> https_fn.Response:
"""Receives a query for the firestore DB or the AI and returns the response"""

data = req.get_json()
ai_resp = None

try:
    query = data["todays_deals"]
    deal_type = "todays_deals"
except KeyError:
    # ... Error handling and check for preferences query

cached_response = fire_store.check_if_cached(str(query)) #helper function

if not cached_response:
    ai_bot = ai.AiBot()
    promos = cloud_storage.read_promos()
    if deal_type == "todays_deals":
        resp = ai_bot.get_top_deals(promos)

    # ... repeat logic for preferred deals and return the response

    else:
        ai_resp = cached_response

return https_fn.Response(ai_resp, status=200)`;

const codeSnippet2 = `@scheduler_fn.on_schedule(schedule="59 04 * * *", memory=MemoryOption.MB_512, timeout_sec=100, max_instances=1)
def databasecleanup(event: scheduler_fn.ScheduledEvent) -> None:
    """Delete old data from and add new data to the firestore database"""
    logger.info("Cleanup running")
    cloud_storage.write_promos()
    fire_store.delete_old_data()
    logger.info("Cleanup finished")`;

const codeSnippet4 = `def get_pref_deals(self, promos: str, query: tuple[str] | str) -> dict:
"""
Queries the AI for preference based sales or current best sales
promos: str
query: tuple for preferred_deals or str for todays_deals
"""
client = genai.Client(api_key=self.api_key)
try:
    response = client.models.generate_content(
    model = self.model,
    contents = # ... Prompt including the variables from the query 
    config = types.GenerateContentConfig(
        # ... config options
    ))
    clean_response = self.clean_json(response.text)
    return clean_response
    # ... Error handling
`;

const codeSnippet5 = `def get_top_deals(self, promos: str) -> dict:
"""
Queries the AI for the top 10 best deals
"""
client = genai.Client(api_key=self.api_key)
try:
    response = client.models.generate_content(
    model = self.model,
    contents = # ... Prompt including the variables from the query 
    
    config = types.GenerateContentConfig(
        # ... config options
    ))
    
    clean_response = self.clean_json(response.text)
    return clean_response
    # ... Error handling
`;

const codeSnippet6 = `
def check_if_cached(query: str):
    """
    checks if ai response data is cached in database.
    Returns data if true, or stores it and returns it if false.
    """
    document_date = str(datetime.now(timezone.utc)).split()[0]
    doc_ref = db.collection(COLLECTION_NAME).document(document_date)
    doc = doc_ref.get()

    if doc.exists:
       # ... query the database
    else: 
        default_data = {
            'created_at': datetime.now(timezone.utc),
            query: {}
        }
        doc_ref.set(default_data) # create new doc

    return False`;


    const codeSnippet8 = `class AiBot():
    """Bot"""
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY")
        self.model = "gemini-2.5-flash-lite"
        self.pref_schema = { # ... JSON schema for preferences response object
        seld.td_schema = { # ... JSON schema for deals response object
 `;

    return (
        <>
        <div className="container my-3 " id="nav-bar">
          <HeaderBar />
        </div>
        
        <div className="container sura-regular" id="headerbox">
          <div>  
          <div className="jumbotron text-white rounded" id="shopping">
              <div className="col-md-6 px-0">
                <h1 className="display-4">AI Shopping Assistant</h1>
                <p className="lead my-3"> Fully automated AI shopping assistant that processeses daily promotional data from Ulta to recommend products based on customer preferences</p>
                <p className="lead mb-0"><a href="#htmldata" className="text-white font-weight-bold">Read More...</a></p>
              </div>
            </div>
            </div>
        </div>
  
        <div className="container my-3 py-2 sura-regular" id="chartbox" >
        <CommonAncestor />
        </div>
  
        <main role="main" className="container sura-regular"id="textbox">
          <div className="row gx-5 px-5">
            <div className="col blog-main mx-2 px-5">
              <h2 className="pb-3 pt-3 mb-4 border-bottom">AI Shopping Assistant</h2>
              <div className="blog-post language-python" id="htmldata">
                      <h2>Introduction</h2>
                      <hr/> 
                      <p>Gone are the days of guessing which products will work for you. When shopping for products online, it can be tedious to sort and navigate through the sheer amount of options and pick the ones best suited for your needs. This is especially true for skincare and makeup products as new options are released on the daily, their skin's needs change over time, and new beauty trends arise frequently. It can also be time-consuming to track the constant cycling of sales and promotions and making sure you are getting the biggest bang for your buck. As most people don't have the means or necessity to hire a skincare attendant, AI is their next best option. This app, with Gemini's advanced reasoning capabilities, allows you to input your personal preferences to receive tailored recommendations. Simply provide details about your skin type, hair concerns, makeup style and the app will return the most suitable products for you from Ulta's daily deals.</p>

                      <p>This project demos an AI product reccomendation app. Once a user selects any skin concerns, it scours through the best deals at Ulta to deliver skincare recommendations addressing those concerns. It also provides a list of the top 10 promotions of the day based on product savings and value. This helps people that are seeking specific guidance as well as those interested in maximizing their savings.</p>

                      <h2>Software Architecture Diagram</h2>
                     <hr/>
                     <Image src="/ai-shopping-assistant-diagram.png" fluid rounded className="mt-3 mb-4" alt="Software Architecture Diagram"/>
    
                      <h2>How it works:</h2>
                      <hr/> 

                      <p>A scraper extracts product data from the Ulta website using Python's <a href="https://pypi.org/project/beautifulsoup4/">Beautiful Soup</a> library. The data is then stored and sent to the Gemini API (<i>gemini-1.5-flash</i>) along with user-specific context for processing and reasoning. The app's backend uses a serverless framework (Cloud Functions for Firebase) which encompasses HTTPS as well as scheduled functions.</p>
                      
                      <p> The scheduled function runs once daily and triggers the retrieval and storage of Ulta's daily promotional data. The promotional data scraped from Ulta is cached in Cloud Storage which prevents Ulta's servers from getting DOSed by our app each day (which violates the TOS, and we want to avoid that). </p>
                        
                      <p>The HTTPS functions are responsive and query the promotions DB, generating AI responses. They also cache those responses in Cloud Firebase to reduce latency. While it is possible to get a custom response for each request, this project uses the free tier of the Gemini API which (at the time of development) is capped at 15 rpm. The caching lets you avoid hitting that cap. Repeatedly processing the data can also change the AI's response which can make the reccomendations seem questionable in terms of consistency and reliability.</p>
                      
                      <h2>Implementation Discussion and Potential Optimizations:</h2>
                      <hr/> 
                      <p>The power of using AI for this process lies in its ability to process and analyze humongous quantities of unstructured data. The app's functionality can easily be extended in a VM or container environment (which unfortunately cost a lot more than serverless functions) to include a lot more products/promotions from multiple websites and utilize dozens of more user preferences. In its initial design, the web-scraper originally used Python's <a href="https://www.selenium.dev/documentation/overview/">Selenium</a> library instead of Beautiful Soup. Selenium's headless browser expands the range of scrape-able data to involve websites that offer web optimizations like lazy-loading, bot detection, and pagination. Unfortunately, at the time of development, headless browsers are offered very limited support in Google Cloud Functions. Though the transition to Beautiful Soup automated the scraping process, it also severly limited the scope of available product data. The code snippets featured below are only provide a general overview. The complete front end code can be found on the github link provided in the navigation bar</p>

                      <p>This app uses the Google Cloud Gemini API to facilitate AI calls.
                      Read the Gemini API Docs <a href="https://ai.google.dev/gemini-api/docs">here.</a></p>

                      <h6><strong>Specs:</strong></h6>
                      <h6>The Back-end</h6>
                      <ul>
                      <li>
                      Database - Firestore, Google Cloud Storage</li>
                      <li>
                      Serverless functions - Cloud Functions for Firebase SDK</li>
                      </ul>
                      <h6>The Front-end</h6>
                      <ul>
                      <li>
                      Hosting - Firebase Hosting</li>
                      <li>
                      Frameworks & Frontend technologies - React and Vite</li>
                      </ul>
                      <h6>APIs</h6>
                      <ul>
                      <li>
                      <a href="https://ai.google.dev/">Gemini API</a>
                      </li>
                      </ul>

                      <h2>The Cloud Functions</h2>
                      <hr/>
                      <p>The code contains an HTTPS cloud function <code>receive_query()</code> and a scheduled cloud function <code>databasecleanup()</code>. They are both a part of the cloud functions for Firebase SDK (versus the cloud functions used in the trading bot project). The HTTPS function is used to receive user requests and query the AI and the scheduled function is used to cache the Ulta promotions in Cloud Storage and Clean up old and irrelavant query caches from Firestore.</p>

                      <p><strong>The HTTPS Function:</strong></p>
                      <p>We first create a HTTPS function that calls the methods from helper modules. It verifies the client request and forms an appropriate query. This query is compared against the firestore cache and stored in it if unavailable.</p>
                      <pre><code>{codeSnippet1}</code></pre><br />
                  
                     <p><strong>The Scheduled Function:</strong></p>
                     <p>The scheduled function deletes old data and adds new data to the firestore database. It also updates the list of promos that exists in cloud storage.</p>
                     <pre><code>{codeSnippet2}</code></pre> <br />
                    
                    
                     <h2>The Helper Functions</h2>
                     <hr/>
                     <p><strong>The Webscraper:</strong></p>
                     
                     <p>The <code>DealGenerator()</code> class is an instantiation of the webscraper. It contains methods to get the Beautiful Soup object from the Ulta website, parse the object for relevant data and apply this logic to different pages.</p>
                    
                     <pre><code>{codeSnippet4}</code></pre>

                     <p>The <code>__get_ulta_sales()</code> method (above) and the <code>__get_ulta_promos()</code> method (below) are both used to parse the HTML data returned from the respective promotional webpages. Sales focuses on price discounts while Promos focuses on Gift-with-Purchase as well as Buy-More-Save-More item promotions. The final helper method <code>get_all_data()</code> (not-shown) applies the code logic to various product category URLs and returns the lists of sales and promotions as a single list. This method was used by the HTTPS cloud function to retreive promotional data. A seperate function <code>__clean_data()</code> was used to parse and clean the strings via regex for data normalization purposes.</p>

                     <pre><code>{codeSnippet5}</code></pre>
                    
                     <p><strong>Database Configuration:</strong></p>

                     <p> The <code>check_if_cached()</code> function checks if the user's query is cached in the firestore database. It returns the cached if it exists. </p>
        
                     <pre><code>{codeSnippet6}</code></pre>
                    
                     <p>The other helper methods that aren't shown in the code snippets include <code>add_data()</code > which writes a new query and its response in Firestore, <code>read_promos()</code > that fetches promotional data from the cloud storage database, and <code>write_promos()</code > that adds a new list of promos to Cloud Storage. The latter snippet is ran by the scheduled function which updates the Cloud Storage object daily with new promotional data.</p>

                     
                     <p>The <code>delete_old_data()</code > function checks if the firestore database has old cached queries and deletes them. It is called by the scheduled function everyday. The <code>'if'</code > statement check exists to make sure that any new daya isn't deleted accidentally when an update is made to the codebase.</p>
                    
                     <p><strong>AI API Calls</strong><br/>
                     The API module simply contains an <code>AiBot()</code > class that instantiates the Gemini AI model. The prompts have been hardcoded to provide the data in 'JSON-mode' which ensures standardized responses.</p>

    <pre><code>{codeSnippet8}</code></pre>
                  
              </div>
            </div>
          </div>
        </main>

        <a href="#nav-bar" style={{display : 'block', padding : '12px', textAlign : "center"}}>Back to top</a>
        <br/> <br/>  <br/>  <br/>
        <FooterBar />
    </> 
    );}

export default AiAssistant;
