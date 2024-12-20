import { Router } from 'express';
import ScrapingController from '../controller/ScrapingController.js';

const router = Router();

router.get('/scraping', ScrapingController.drogalider);

export default router;