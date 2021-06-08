const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

///assertion
chai.should();
chai.use(chaiHttp);

describe('Posts APIs', () => {

    /** 
     * Test Get All Posts route 
    */

    ////////// Right scenario 
    describe('GET /api/posts', () => {
        it('It should GET all the posts', (done) => {
            chai.request(server)
                .get("/api/posts")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    ////Wrong scenario ----Wrong Url Path
    describe('GET /api/post', () => {
        it('It should NOT GET All posts', (done) => {
            chai.request(server)
                .get("/api/post")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    /** 
     * Test Get Post by ID route 
    */

    describe('GET /api/posts/:id', () => {
        it('It should GET a post by ID', (done) => {
            const postId = '60bd35d4bcfc7136007fe42d';
            chai.request(server)
                .get("/api/posts/" + postId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id').eq(postId);
                    response.body.should.have.property('title');
                    response.body.should.have.property('body');
                    response.body.should.have.property('comments');
                    response.body.should.have.property('user_id');
                    response.body.should.have.property('createdAt');
                    response.body.should.have.property('updatedAt');
                    done();
                });
        });
    });

    describe('GET /api/posts/:id', () => {
        it('It should NOT GET a post by ID', (done) => {
            const postId = '10bd35d4bcfc7136003fe42d';
            chai.request(server)
                .get("/api/posts/" + postId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.success.should.be.eq(false);
                    response.body.message.should.be.eq("No Post exist with this ID");

                    done();
                });
        });
    });
   /** 
     * Test POST a new Post
    */
    describe('POST /api/posts', () => {
        it('It should Create a New Post', (done) => {
            const post = {
                title:"post 1 - testing",
                body:"this is the post body"
            }
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmQzMWMyYzg3YmRkMDkwMGQzYTkwNSIsImlhdCI6MTYyMzAxMTk3M30.6pvtUolwHHh8G_O-HWe26Kk3oolaz2iZB_7zgnxXgU0"
            const userId = "60bd31c2c87bdd0900d3a905"
            chai.request(server)
                .post("/api/posts")
                .set("Authorization", token)
                .send(post)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.success.should.be.eq(true);
                    response.body.message.should.be.eq("post was created succesfully");
                    response.body.post.should.be.a('object');
                    response.body.post.should.have.property('_id');
                    response.body.post.should.have.property('title').eq(post.title);
                    response.body.post.should.have.property('body').eq(post.body);
                    response.body.post.should.have.property('comments').that.eql([]);
                    response.body.post.should.have.property('user_id').eq(userId);
                    response.body.post.should.have.property('createdAt');
                    response.body.post.should.have.property('updatedAt');
                    done();
                });
        });
    });


    describe('POST /api/posts', () => {
        it('It should NOT Create a New Post for Unauthorized User', (done) => {
            const post = {
                title:"post 1 - testing",
                body:"this is the post body"
            }
            const token = "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmQzMWMyYzg3YmRkMDkwMGQzYTkwNSIsImlhdCI6MTYyMzAxMTk3M30.6pvtUolwHHh8G_O-HWe26Kk3oolaz2iZB_7zgnxXgU0"
            const userId = "60bd31c2c87bdd0900c3a905"
            chai.request(server)
                .post("/api/posts")
                .set("Authorization", token)
                .send(post)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.success.should.be.eq(false);
                    response.body.message.should.be.eq("Not Authorized");
                    done();
                });
        });
    });

});