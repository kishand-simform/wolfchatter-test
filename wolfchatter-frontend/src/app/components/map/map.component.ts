import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output,OnDestroy } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { Observable, Subject, Subscriber, takeUntil } from 'rxjs';
import { ChatroomService } from '../../services/chatroom/chatroom.service';

interface IChatroom {
  chatroom_id: number;
  latitude: string;
  longitude: string;
  created_at: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  providers: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Output() pinAdded = new EventEmitter<{ latitude: number, longitude: number }>();
  map!: L.Map;
  chatrooms: IChatroom[] = [];
  private destroy$ = new Subject<void>();

  private chatroomService: ChatroomService = inject(ChatroomService)

  ngAfterViewInit() {
    this.initializeMap();
    this.getMarkers();
    this.chatroomService.listenMarker();

    this.chatroomService.markerSubject$.subscribe({
      next: (response) => {
        this.getMarkers();
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeMap() {
    this.map = L.map('map').setView([0, 0], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© Simform Solutions',
      maxZoom: 10,
    }).addTo(this.map);

    this.getCurrentPosition().pipe(takeUntil(this.destroy$)).subscribe((position: any) => {
      this.map.flyTo([position.latitude, position.longitude], 10)
    })

    this.map.on('click', (event: any) => {
      event.originalEvent.stopPropagation();
      const { lat, lng } = event.latlng;
      this.addPin(lat, lng);
      this.pinAdded.emit({ latitude: lat, longitude: lng });
    });
  }

  addPin(latitude: number, longitude: number) {
    const marker = L.marker([latitude, longitude]).addTo(this.map);

    this.chatroomService.createChatroom(latitude, longitude).pipe(takeUntil(this.destroy$)).subscribe({
      next: (chatroom: IChatroom) => {
        this.chatroomService.addMarker(latitude, longitude);
        marker.on('click', (event: any) => {
          event.originalEvent.stopPropagation();
          this.chatroomService.joinChatroom(chatroom.chatroom_id);
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCurrentPosition() {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          observer.complete();
        })
      } else {
        observer.error();
      }
    })
  }

  getMarkers() {
    this.chatroomService.getAllChatrooms().pipe(takeUntil(this.destroy$)).subscribe({
      next: (chatrooms: IChatroom[]) => {
        this.chatrooms = chatrooms;
        for (let i = 0; i < this.chatrooms.length; i++) {
          const chatroom = this.chatrooms[i];
          const marker = L.marker([+chatroom.latitude, +chatroom.longitude]).addTo(this.map);

          marker.on('click', (event: any) => {
            event.originalEvent.stopPropagation();
            this.chatroomService.joinChatroom(chatroom.chatroom_id);
          })
        }
      }
    });
  }
}

