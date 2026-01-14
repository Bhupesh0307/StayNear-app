classDiagram
  %% --- Data Models ---
  class User {
    +ObjectId _id
    +String name
    +String email
    +String passwordHash
    +String role    %% renter | owner | admin
    +Date createdAt
    +boolean checkPassword(password)
  }

  class House {
    +ObjectId _id
    +ObjectId ownerId
    +String title
    +String description
    +String address
    +Number pricePerNight
    +String[] images
    +String qrUrl
    +String status    %% pending | approved | rejected | unlisted
    +Date createdAt
    +Date updatedAt
    +boolean isAvailable(startDate, endDate)
  }

  class Booking {
    +ObjectId _id
    +ObjectId houseId
    +ObjectId renterId
    +ObjectId ownerId
    +Date startDate
    +Date endDate
    +Number nights
    +Number amount
    +String paymentProofUrl
    +String transactionId
    +String status      %% pending | approved | rejected
    +Date createdAt
    +boolean overlapsWith(start, end)
  }

  %% --- Controllers / Routes ---
  class AuthController {
    +register(req, res)
    +login(req, res)
    +logout(req, res)
    +refreshToken(req, res)
  }

  class HouseController {
    +createHouse(req, res)
    +updateHouse(req, res)
    +patchHouseStatus(req, res)
    +getHouse(req, res)
    +searchHouses(req, res)
    +getAvailability(req, res)
  }

  class BookingController {
    +createBooking(req, res)
    +getBookings(req, res)
    +patchBookingStatus(req, res)
    +cancelBooking(req, res)
  }

  %% --- Services / Utilities ---
  class AvailabilityService {
    +isAvailable(houseId, startDate, endDate)
    +reserveTemporarily(houseId, startDate, endDate)
    +releaseReservation(reservationId)
  }

  class UploadService {
    +saveHouseImages(files, meta)
    +savePaymentProof(file, meta)
    +getPublicUrl(fileId)
  }

  class AuthService {
    +generateJwt(user)
    +verifyJwt(token)
    +hashPassword(plain)
    +comparePassword(plain, hash)
  }

  class Validation {
    +validate(schema, data)
  }

  %% --- DB / Storage ---
  class MongoDB {
    <<Database>>
  }
  class UploadsDir {
    <<File Storage>>
  }

  %% --- Associations ---
  User "1" o-- "0..*" House : owns
  House "1" o-- "0..*" Booking : has
  User "1" o-- "0..*" Booking : makes
  Booking ..> UploadsDir : paymentProof stored in
  House ..> UploadsDir : images and qr stored in
  AuthController ..> AuthService : uses
  HouseController ..> AvailabilityService : uses
  HouseController ..> UploadService : uses
  BookingController ..> AvailabilityService : uses
  BookingController ..> UploadService : uses
  AuthService ..> MongoDB : reads/writes users
  HouseController ..> MongoDB : reads/writes houses
  BookingController ..> MongoDB : reads/writes bookings
  AvailabilityService ..> MongoDB : reads bookings

  %% --- Notes ---
  %% Use role-check middleware between controllers and services to enforce owner/admin/renter permissions
