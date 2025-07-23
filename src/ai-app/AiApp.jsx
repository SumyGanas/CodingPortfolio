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
    max_instances=1, cors=options.CorsOptions(cors_origins=[[REDACTED]], cors_methods=["get", "post"])
)
def receive_query(req: https_fn.Request) -> https_fn.Response:
    """Receives a query for the firestore DB or the AI and returns the response"""

    data = req.get_json()

    ai_resp = None

    try:
    query = data["todays_deals"]
    deal_type = "todays_deals"
    except KeyError:
    try:
        query = (data["skin_types"], data["skin_concerns"], data["hair_types"],
                data["hair_concerns"], data["makeup_preferences"])
        deal_type = "preferred_deals"
    except KeyError as exc:
        raise RuntimeError("Unknown Query") from exc

    cached_response = database_config.check_if_cached(str(query))

    if not cached_response:
    ai_bot = ai.AiBot()
    promos = database_config.read_promos()
    ai_resp = ai_bot.get_deals(deal_type, promos, query)
    database_config.add_data(query, ai_resp)
    else:
    ai_resp = cached_response

    if ai_resp is None:
    return https_fn.Response("Error: No AI response generated", status=500)
    return https_fn.Response(ai_resp, status=200)`;

const codeSnippet2 = `@scheduler_fn.on_schedule(schedule="59 04 * * *")
def databasecleanup(event: scheduler_fn.ScheduledEvent) -> None:
      database_config.write_promos()
      time.sleep(60)
      database_config.delete_old_data()`;

      const codeSnippet3 = `class DealGenerator():
      def __init__(self):
          pass

      def __get_ulta_soup(self, url) -> BeautifulSoup:
          page = requests.get(url, timeout=5)
          soup = BeautifulSoup(page.content, "html.parser")
          return soup
       `;
const codeSnippet4 = `def __get_ulta_sales(self, url) -> list[str]:
    soup = self.__get_ulta_soup(url)
    promo_list = []
    items = soup.select("li.ProductListingResults__productCard a")
    for item in items:
        item_type = item.select_one("div.ProductCard__badge p").text
        if item_type != "Sponsored":
            trash_elems = item.select("div.ProductCard__rating,div.ProductCard__image,div.ProductCard__offers,span[aria-hidden='true']")
            if trash_elems:
                for elem in trash_elems:
                    elem.extract()
            ls = []
            for tag in item.descendants:
                if tag.string is not None and isinstance(tag, NavigableString):
                    ls.append(tag.string)
            promo = " ".join(ls)
            promo_list.append(promo)

    promo_list = self.__clean_data(promo_list)
    return promo_list
`;

const codeSnippet5 = `def __get_ulta_promos(self, sale_type: str) -> list[str]:
    if sale == "gwp":
        url = "https://www.ulta.com/promotion/gift-with-purchase"
    if sale == "bmsm":
        url = "https://www.ulta.com/promotion/buy-more-save-more"

    soup = self.__get_ulta_soup(url)
    promo_list = []
    items = soup.select("li.PromotionListingResults__compactDealCard div.CompactDealCard__gwpLine")
    for item in items:
        ls = []
        for tag in item.descendants:
            if tag.string is not None and isinstance(tag, NavigableString):
                ls.append(tag.string)
        promo = " ".join(ls)
        promo_list.append(promo)

    promo_list = self.__clean_data(promo_list)
    return promo_list
`;

const codeSnippet6 = `
def check_if_cached(query: str):
    document_date = str(datetime.today()).split()[0]

    doc_ref = db.collection(COLLECTION_NAME).document(document_date)
    doc = doc_ref.get()

    if doc.exists:
        doc_data = doc.to_dict()
        if query in doc_data:
            return doc_data[query]
    else:
        default_data = {
            "created_at": datetime.now(),
            query: {}
        }
        doc_ref.set(default_data)

    return False`;

    const codeSnippet7 = `def delete_old_data():
    today = datetime.today()
    yesterday = today - timedelta(days=1)
    yesterday_date_str = yesterday.strftime("%Y-%m-%d")

    docs = list(db.collection(COLLECTION_NAME).stream())
    if len(docs) > 1:
        doc_ref = db.collection(COLLECTION_NAME).document(yesterday_date_str)
        if doc_ref.get().exists:
            doc_ref.delete()
    `;

    const codeSnippet8 = `class AiBot():
    def __init__(self):
       api_key = os.environ.get("API_KEY")
       self.model = genai.GenerativeModel(
           "gemini-1.5-flash",generation_config={"response_mime_type": "application/json"}
           )
     genai.configure(api_key=api_key)

     def get_deals(self, dealtype: str, promos: str, query: tuple[str] | str):
     if dealtype == "preferred_deals":
        pref = f"a customer who has {query[0]} skin with {query[1]}, {query[2]} hair that is {query[3]}, and likes a {query[4]} makeup look"
        prompt = f"You are an expert at recommending beauty products to customers based on their needs. Identify the best makeup, skincare, and haircare products across Ulta for {pref}. List the top 10 and explain why they would be beneficial. Here are the current promotions at Ulta: {promos}. Return a list[Recommendation] using this JSON schema: Recommendation = {{'product_sale_details': 'str', 'product_relevance_for_customer': 'str'}}"
     elif dealtype == "todays_deals":
        prompt = f"You are an expert at recommending beauty products based on value, savings and gifts with purchase. Given a list of promotions at Ulta, identify the top 10 best deals. Promotions: {promos}. Using this JSON schema: Deal = {{'product_details': 'str'}}, Return a list[Deal]"

        try:
            response = self.model.generate_content(prompt)
            logger.info(response.usage_metadata)

            return response.text

        except UnboundLocalError:
            return "Empty/incorrect prompt provided to the AI"
 `;

    return (
        <>
        <div className="container " id="nav-bar">
          <HeaderBar />
        </div>
        
        <div className="container sura-regular" id="headerbox">
          <div>  
          <div className="jumbotron p-3 p-md-5 text-white rounded" id="shopping">
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
                  <p className="blog-post-meta"> Jul 15, 2024 by <a href="https://www.linkedin.com/in/sumy-ganas-201a89308/" rel="noreferrer" target="_blank">Sumy</a> </p>
                      <h2>Introduction</h2>
                      <hr/> 
                      <p>When shopping for products online, it can be tedious to sort and navigate through the sheer amount of options and pick the ones best suited for your needs. This is especially true for skincare and makeup products as new options are released on the daily, their skin's needs change over time, and new beauty trends arise frequently. It can also be time-consuming to track the constant cycling of sales and promotions and making sure you are getting the biggest bang for your buck. As most people don't have the means or necessity to hire a skincare attendant, AI is their next best option.</p>

                      <p>This project demos an AI product reccomendation app. Once a user selects any skin concerns, it scours through the best deals at Ulta to deliver skincare recommendations addressing those concerns. It also provides a list of the top 10 promotions of the day based on product savings and value. This helps people that are seeking specific guidance as well as those interested in maximizing their savings.</p>

                      <h2>Software Architecture Diagram</h2>
                     <hr/>
                     <Image src="/ai-shopping-assistant-diagram.png" fluid rounded className="mt-3 mb-4" alt="Software Architecture Diagram"/>
    
                      <h2>How it works:</h2>
                      <hr/> 

                      <p>A scraper extracts product data from the Ulta website using Python's <a href="https://pypi.org/project/beautifulsoup4/">Beautiful Soup</a> library. The data is then stored and sent to the Gemini API (<i>gemini-1.5-flash</i>) along with user-specific context for processing and reasoning. The app's backend uses a serverless framework (Cloud Functions for Firebase) which encompasses HTTPS as well as scheduled functions.</p>
                      
                      <p> The scheduled function runs once daily and triggers the retrieval and storage of Ulta's daily promotional data. The promotional data scraped from Ulta is cached in Cloud Storage which prevents Ulta's servers from getting DOSed by our app each day (which violates the TOS, and we want to avoid that). </p>
                        
                      <p>The HTTPS functions are responsive and query the promotions DB, generating AI responses. They also cache those responses in Cloud Firebase to reduce latency. While it is possible to get a custom response for each request, this project uses the free tier of the Gemini API which (at the time of development) is capped at 15 rpm. The caching lets you avoid hitting that cap. Repeatedly processing the data can also change the AI's response which can make the reccomendations seem questionable in terms of consistency and reliability.</p>
                      
                      <p>The power of using AI for this process lies in its ability to handle humongous quantities of unstructured data. The app's functionality can easily be extended in a VM or container environment (which unfortunately cost a lot more than serverless functions) to include a lot more products/promotions from multiple websites and utilize dozens of more user preferences. In its initial design, the web-scraper originally used Python's <a href="https://www.selenium.dev/documentation/overview/">Selenium</a> library instead of Beautiful Soup. Selenium's headless browser expands the range of scrape-able data to involve websites that offer web optimizations like lazy-loading, bot prevention, and pagination. However, headless browsers are currently offered very limited support in Google Cloud Functions. Thus, though the transition to Beautiful Soup simplified the scraping process, it also severly limited the scope of available product data.</p>

                      <p>This app uses the Google Cloud Gemini API to facilitate AI calls.
                      Read the Gemini API Docs <a href="https://ai.google.dev/gemini-api/docs">here.</a></p>

                      <h6><strong>Specs:</strong></h6>
                      <h6>The Back-end</h6>
                      <ul>
                      <li>
                      Database - Google Cloud Firestore, Google Cloud Storage</li>
                      <li>
                      Serverless functions - Google Cloud Functions for Firebase </li>
                      </ul>
                      <h6>The Front-end</h6>
                      <ul>
                      <li>
                      Hosting - Google Cloud Firebase Hosting</li>
                      <li>
                      Frameworks & Frontend technologies - React, Bootstrap for React, ReactRouter</li>
                      </ul>
                      <h6>APIs</h6>
                      <ul>
                      <li>
                      <a href="https://ai.google.dev/">Google Cloud Gemini API</a>
                      </li>
                      </ul>

                      <h2>The Cloud Functions</h2>
                      <hr/>
                      <p>The code involves an HTTPS cloud function <code>receive_query()</code> and a scheduled cloud function <code>databasecleanup()</code>. They are both a part of the cloud functions for Firebase SDK (as opposed to the cloud functions used in the trading bot project). The HTTPS function is used to receive user requests and query the AI and the scheduled function is used to cache the Ulta promotions in Cloud Storage and Clean up old and irrelavant query caches from Firestore. The code snippets featured below are only to give the reader an idea of how the app is programmed to execute. <b>It does not include all the methods and functions used.</b> The full code for this app is available on GitHub at: </p>

                      <p><strong>The HTTPS Function:</strong> <br />
                      We first create a HTTPS function that calls the methods from helper modules. It verifies the client request and forms an appropriate query. This query is compared against the firestore cache and stored in it if unavailable. The helper methods are shown further below.</p>
                        <pre><code>{codeSnippet1}</code></pre>
                  
                     <p><strong>The Scheduled Function:</strong> <br /></p>

                     <p>The scheduled function deletes old data and adds new data to the firestore database. It also updates the list of promos that exists in cloud storage.</p>
                     <pre><code>{codeSnippet2}</code></pre> <br />
                    
                    
                     <h2>The Helper Modules</h2>
                     <hr/>
                     <p><strong>The Webscraper:</strong></p>
                     <pre><code>{codeSnippet3}</code></pre>
                     <p>The <code>DealGenerator()</code> class is an instantiation of the webscraper. It contains methods to get the Beautiful Soup object from the Ulta website, parse the object for relevant data and apply this logic to different pages.</p>
                    
                     <pre><code>{codeSnippet4}</code></pre>

                     <p>The <code>__get_ulta_sales()</code> method (above) and the <code>__get_ulta_promos()</code> method (below) are both used to parse the HTML data returned from the respective promotional webpages. Sales focuses on price discounts while Promos focuses on Gift-with-Purchase as well as Buy-More-Save-More item promotions. The final helper method <code>get_all_data()</code> (not-shown) applies the code logic to various product category URLs and returns the lists of sales and promotions as a single list. This method was used by the HTTPS cloud function to retreive promotional data. A seperate function <code>__clean_data()</code> was used to parse and clean the strings via regex for data normalization purposes.</p>

                     <pre><code>{codeSnippet5}</code></pre>
                    
                     <p><strong>Database Configuration:</strong></p>

                     <p> The <code>check_if_cached()</code> function checks if the user's query is cached in the firestore database. It returns the cached if it exists. </p>
        
                     <pre><code>{codeSnippet6}</code></pre>
                    
                     <p>The other helper methods that aren't shown in the code snippets include <code>add_data()</code > which writes a new query and its response in Firestore, <code>read_promos()</code > that fetches promotional data from the cloud storage database, and <code>write_promos()</code > that adds a new list of promos to Cloud Storage. The latter snippet is ran by the scheduled function which updates the Cloud Storage object daily with new promotional data.</p>

                     <pre><code>{codeSnippet7}</code></pre>
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
