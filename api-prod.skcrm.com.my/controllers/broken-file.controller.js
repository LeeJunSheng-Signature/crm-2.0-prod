"use strict";
// /* eslint-disable @typescript-eslint/naming-convention */
// // Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/core';
// import {Filter, repository} from '@loopback/repository';
// import {
//   del,
//   get,
//   getFilterSchemaFor,
//   param,
//   Request,
//   Response,
//   RestBindings
// } from '@loopback/rest';
// import fs from 'fs';
// import path from 'path';
// import {promisify} from 'util';
// import {Container, File} from '../models';
// import {ItemListRepository, LeadRepository} from '../repositories';
// import {FileService} from '../services';
// const readdir = promisify(fs.readdir);
// const TMPDIR = path.resolve(__dirname, '../../.tmpdir');
// const csvToJson = require('convert-csv-to-json');
// const {convert} = require('xlsx-converter');
// const detect = require('detect-file-type');
// export class FileController {
//   constructor(
//     @repository(LeadRepository)
//     public LeadRepository: LeadRepository,
//     @repository(ItemListRepository)
//     public ItemListRepository: ItemListRepository,
//     @inject('services.FileService') protected fileService: FileService,
//     @inject(RestBindings.Http.REQUEST) public request: Request,
//     @inject(RestBindings.Http.RESPONSE) public response: Response
//   ) {}
//   @get(`/containers/files`, {
//     responses: {
//       '200': {
//         description: 'Array of Files model instances belongs to container',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: {'x-ts-type': File}},
//           },
//         },
//       },
//     },
//   })
//   async findFilesInContainer(
//     @param.query.object('filter', getFilterSchemaFor(Container))
//     filter?: Filter,
//   ): Promise<File[]> {
//     const getFiles = promisify(this.fileService.getFiles);
//     return getFiles(`${process.env.STORAGE_CONTAINER}`, {});
//   }
//   @get('/containers/files/{fileName}', {
//     responses: {
//       '200': {
//         description: 'File model instances belongs to container',
//         content: {'application/json': {schema: {'x-ts-type': File}}},
//       },
//     },
//   })
//   async findFileInContainer(
//     @param.path.string('fileName') fileName: string,
//   ): Promise<File> {
//     const getFile = promisify(this.fileService.getFile);
//     return getFile(`${process.env.STORAGE_CONTAINER}`, fileName);
//   }
//   @del('/containers/files/{fileName}', {
//     responses: {
//       '204': {
//         description: 'File DELETE from Container success',
//       },
//     },
//   })
//   async deleteFileInContainer(
//     @param.path.string('fileName') fileName: string,
//   ): Promise<boolean> {
//     const removeFile = promisify(this.fileService.removeFile);
//     return removeFile(`${process.env.STORAGE_CONTAINER}`, fileName);
//   }
//   // @post(`/containers/upload/item-lists`, {
//   //   responses: {
//   //     '200': {
//   //       description: 'Upload a Files model instances into Container',
//   //       content: {'application/json': {schema: {type: 'object'}}},
//   //     },
//   //   },
//   // })
//   // async uploads(
//   //   @requestBody.file()
//   //   request: Request,
//   //   @inject(RestBindings.Http.RESPONSE) response: Response,
//   // ): Promise<any> {
//   //   const upload = promisify(this.fileService.upload);
//   //   const file = await new Promise<any>((resolve, reject) => {
//   //     this.handler(request, response, (err: unknown) => {
//   //       if (err) reject(err);
//   //       else {
//   //         resolve(FileController.getFilesAndFields(request));
//   //       }
//   //     });
//   //   });
//   //   const fileType = file.files[0].mimetype;
//   //   interface noti {
//   //     message: string
//   //   };
//   //   if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//   //     const filename = file.files[0].originalname;
//   //     const actualfile = this.validateFileName(filename);
//   //     const buf = fs.readFileSync(actualfile);
//   //     const wb = XLSX.read(buf, {type: 'buffer'});
//   //     const first_sheet = wb.Sheets[wb.SheetNames[0]];
//   //     const json = XLSX.utils.sheet_to_json(first_sheet);
//   //     const json2: any = json;
//   //     const fileSize = json.length;
//   //     for (let i = 0; i < fileSize; i++) {
//   //       await this.ItemListRepository.create({
//   //         category: json2[i].category,
//   //         name: json2[i].name,
//   //         virture: json2[i].virture,
//   //         puom: json2[i].puom,
//   //         suom: json2[i].suom,
//   //         fraction: json2[i].fraction,
//   //         stdcost: json2[i].stdcost,
//   //         markuprate: json2[i].markuprate,
//   //         part: json2[i].part,
//   //         installationcharges: json2[i].installationcharges,
//   //         dealerprice: json2[i].dealerprice,
//   //         active: json2[i].active
//   //       });
//   //     }
//   //     //return json2[0];
//   //   } else {
//   //     const error: noti = {
//   //       message: "File type must be xlsx"
//   //     }
//   //     return error;
//   //   }
//   // }
//   // @post(`/containers/upload/lead`, {
//   //   responses: {
//   //     '200': {
//   //       description: 'Upload a File model instances into Leads',
//   //       content: {'application/json': {schema: {type: 'object'}}},
//   //     },
//   //   },
//   // })
//   // async upload(
//   //   @requestBody.file()
//   //   request: Request,
//   //   @inject(RestBindings.Http.RESPONSE) response: Response,
//   // ): Promise<any> {
//   //   const upload = promisify(this.fileService.upload);
//   //   const file = await new Promise<any>((resolve, reject) => {
//   //     this.handler(request, response, (err: unknown) => {
//   //       if (err) reject(err);
//   //       else {
//   //         resolve(FileController.getFilesAndFields(request));
//   //       }
//   //     });
//   //   });
//   //   const fileType = file.files[0].mimetype;
//   //   interface noti {
//   //     message: string
//   //   };
//   //   if (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileType == "application/vnd.ms-excel") {
//   //     const filename = file.files[0].originalname;
//   //     const actualfile = this.validateFileName(filename);
//   //     const buf = fs.readFileSync(actualfile);
//   //     const wb = XLSX.read(buf, {type: 'buffer'});
//   //     const first_sheet = wb.Sheets[wb.SheetNames[0]];
//   //     const json = XLSX.utils.sheet_to_json(first_sheet);
//   //     const json2: any = json;
//   //     const fileSize = json.length;
//   //     for (let i = 0; i < fileSize; i++) {
//   //       const leadExisted = await this.LeadRepository.findOne({
//   //         where: {email: json2[i].email},
//   //       });
//   //       const newUserTime = FileController.ExcelDateToJSDate(json2[i].timestamp);
//   //       let campaignDate: any = json2[i].campaign;
//   //       if (typeof json2[i].campaign == 'number') {
//   //         campaignDate = FileController.ExcelDateToJSDate(campaignDate);
//   //       }
//   //       if (!leadExisted) {
//   //         this.LeadRepository.create({
//   //           name: json2[i].name,
//   //           email: json2[i].email,
//   //           phone: json2[i].phone,
//   //           location: json2[i].location,
//   //           property_type: json2[i].property_type,
//   //           age: json2[i].age,
//   //           property_value: json2[i].property_value,
//   //           time_contact: json2[i].time_contact,
//   //           source_lead: json2[i].source_lead,
//   //           channel_contact: json2[i].channel_contact,
//   //           campaign: campaignDate,
//   //           createdAt: newUserTime,
//   //           status: "online"
//   //         });
//   //       } else {
//   //         const existingUserTime = leadExisted!.createdAt;
//   //         //check if date for new user and existing user both exists
//   //         if (existingUserTime && newUserTime) {
//   //           //if new user time is newer than existing, update in db
//   //           if (newUserTime >= existingUserTime) {
//   //             //check if new data exist, if not keep the old data
//   //             this.LeadRepository.updateById(leadExisted!.uuid, {
//   //               name: (json2[i].name != null) ? json2[i].name : leadExisted!.name,
//   //               email: (json2[i].email != null) ? json2[i].email : leadExisted!.email,
//   //               phone: (json2[i].phone != null) ? json2[i].phone : leadExisted!.phone,
//   //               location: (json2[i].location != null) ? json2[i].location : leadExisted!.location,
//   //               property_type: (json2[i].property_type != null) ? json2[i].property_type : leadExisted!.property_type,
//   //               age: (json2[i].age != null) ? json2[i].age : leadExisted!.age,
//   //               property_value: (json2[i].property_value != null) ? json2[i].property_value : leadExisted!.property_value,
//   //               time_contact: (json2[i].time_contact != null) ? json2[i].time_contact : leadExisted!.time_contact,
//   //               source_lead: (json2[i].source_lead != null) ? json2[i].source_lead : leadExisted!.source_lead,
//   //               channel_contact: (json2[i].channel_contact != null) ? json2[i].channel_contact : leadExisted!.channel_contact,
//   //               campaign: (campaignDate != null) ? campaignDate : leadExisted!.campaign,
//   //               createdAt: (json2[i].createdAt != null) ? newUserTime : existingUserTime
//   //             });
//   //           } else {
//   //             //check if old data exist, if not enter the new data
//   //             this.LeadRepository.updateById(leadExisted!.uuid, {
//   //               name: (leadExisted!.name != null) ? leadExisted!.name : json2[i].name,
//   //               email: (leadExisted!.email != null) ? leadExisted!.email : json2[i].email,
//   //               phone: (leadExisted!.phone != null) ? leadExisted!.phone : json2[i].phone,
//   //               location: (leadExisted!.location != null) ? leadExisted!.location : json2[i].location,
//   //               property_type: (leadExisted!.property_type != null) ? leadExisted!.property_type : json2[i].property_type,
//   //               age: (leadExisted!.age != null) ? leadExisted!.age : json2[i].age,
//   //               property_value: (leadExisted!.property_value != null) ? leadExisted!.property_value : json2[i].property_value,
//   //               time_contact: (leadExisted!.time_contact != null) ? leadExisted!.time_contact : json2[i].time_contact,
//   //               source_lead: (leadExisted!.source_lead != null) ? leadExisted!.source_lead : json2[i].source_lead,
//   //               channel_contact: (leadExisted!.channel_contact != null) ? leadExisted!.channel_contact : json2[i].channel_contact,
//   //               campaign: (campaignDate != null) ? leadExisted!.campaign : campaignDate,
//   //               createdAt: (leadExisted!.createdAt != null) ? existingUserTime : newUserTime
//   //             });
//   //           }
//   //           //existing data no timestamp, but new data have timestamp
//   //         } else if (newUserTime) {
//   //           //enter new data, if new data null, keep old data
//   //           this.LeadRepository.updateById(leadExisted!.uuid, {
//   //             name: (json2[i].name != null) ? json2[i].name : leadExisted!.name,
//   //             email: (json2[i].email != null) ? json2[i].email : leadExisted!.email,
//   //             phone: (json2[i].phone != null) ? json2[i].phone : leadExisted!.phone,
//   //             location: (json2[i].location != null) ? json2[i].location : leadExisted!.location,
//   //             property_type: (json2[i].property_type != null) ? json2[i].property_type : leadExisted!.property_type,
//   //             age: (json2[i].age != null) ? json2[i].age : leadExisted!.age,
//   //             property_value: (json2[i].property_value != null) ? json2[i].property_value : leadExisted!.property_value,
//   //             time_contact: (json2[i].time_contact != null) ? json2[i].time_contact : leadExisted!.time_contact,
//   //             source_lead: (json2[i].source_lead != null) ? json2[i].source_lead : leadExisted!.source_lead,
//   //             channel_contact: (json2[i].channel_contact != null) ? json2[i].channel_contact : leadExisted!.channel_contact,
//   //             campaign: (campaignDate != null) ? campaignDate : leadExisted!.campaign,
//   //             createdAt: (json2[i].createdAt != null) ? newUserTime : existingUserTime
//   //           });
//   //         }
//   //       }
//   //     }
//   //     /*const leadExisted = await this.LeadRepository.findOne({
//   //       where: {email: json2[0].email},
//   //     });
//   //     const userCreated = FileController.ExcelDateToJSDate(json2[0].timestamp);
//   //     return userCreated;
//   //     */
//   //     //return leadExisted?.email;
//   //   } else {
//   //     throw new HttpErrors.BadRequest(
//   //       'File type must be csv/excel',
//   //     );
//   //   }
//   // }
//   // @post('/files', {
//   //   responses: {
//   //     200: {
//   //       content: {
//   //         'application/json': {
//   //           schema: {
//   //             type: 'object',
//   //           },
//   //         },
//   //       },
//   //       description: 'Files and fields',
//   //     },
//   //   },
//   // })
//   // async fileUpload(
//   //   @requestBody.file()
//   //   request: Request,
//   //   @inject(RestBindings.Http.RESPONSE) response: Response,
//   // ): Promise<object> {
//   //   return new Promise<object>((resolve, reject) => {
//   //     this.handler(request, response, (err: unknown) => {
//   //       if (err) reject(err);
//   //       else {
//   //         resolve(FileController.getFilesAndFields(request));
//   //       }
//   //     });
//   //   });
//   // }
//   // @get('/files', {
//   //   responses: {
//   //     200: {
//   //       content: {
//   //         // string[]
//   //         'application/json': {
//   //           schema: {
//   //             type: 'array',
//   //             items: {
//   //               type: 'string',
//   //             },
//   //           },
//   //         },
//   //       },
//   //       description: 'A list of files',
//   //     },
//   //   },
//   // })
//   // async listFiles() {
//   //   const files = await readdir(this.storageDirectory);
//   //   return files;
//   // }
//   // @get('/files/{filename}')
//   // @oas.response.file()
//   // downloadFile(
//   //   @param.path.string('filename') fileName: string,
//   //   @inject(RestBindings.Http.RESPONSE) response: Response,
//   // ) {
//   //   const file = this.validateFileName(fileName);
//   //   response.download(file, fileName);
//   //   return response;
//   // }
//   // /**
//   //  * Validate file names to prevent them goes beyond the designated directory
//   //  * @param fileName - File name
//   //  */
//   // private validateFileName(fileName: string) {
//   //   const resolved = path.resolve(this.storageDirectory, fileName);
//   //   if (resolved.startsWith(this.storageDirectory)) return resolved;
//   //   // The resolved file is outside sandbox
//   //   throw new HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
//   // }
//   @get('/containers/download/{fileName}', {
//     responses: {
//       '200': {
//         description: 'Download a File within specified Container',
//         content: {'application/json': {schema: {'x-ts-type': Object}}},
//       },
//     },
//   })
//   async download(
//     @param.path.string('fileName') fileName: string,
//   ): Promise<any> {
//     const download = promisify(this.fileService.download);
//     return download(
//       `${process.env.STORAGE_CONTAINER}`,
//       fileName,
//       this.request,
//       this.response,
//     );
//   }
//   private static getFilesAndFields(request: Request) {
//     const uploadedFiles = request.files;
//     const mapper = (f: globalThis.Express.Multer.File) => ({
//       fieldname: f.fieldname,
//       originalname: f.originalname,
//       encoding: f.encoding,
//       mimetype: f.mimetype,
//       size: f.size,
//     });
//     let files: object[] = [];
//     if (Array.isArray(uploadedFiles)) {
//       files = uploadedFiles.map(mapper);
//     } else {
//       for (const filename in uploadedFiles) {
//         files.push(...uploadedFiles[filename].map(mapper));
//       }
//     }
//     return {files};
//   }
//   private static ExcelDateToJSDate(serial: any) {
//     const utc_days = Math.floor(serial - 25569);
//     const utc_value = utc_days * 86400;
//     const date_info = new Date(utc_value * 1000);
//     const fractional_day = serial - Math.floor(serial) + 0.0000001;
//     let total_seconds = Math.floor(86400 * fractional_day);
//     const seconds = total_seconds % 60;
//     total_seconds -= seconds;
//     const hours = Math.floor(total_seconds / (60 * 60));
//     const minutes = Math.floor(total_seconds / 60) % 60;
//     return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours + 8, minutes, seconds);
//   }
// }
//# sourceMappingURL=broken-file.controller.js.map